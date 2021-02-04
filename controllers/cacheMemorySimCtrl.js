const { makeCache } = require('../modules/cacheFunc');
const hexToBinary = require('hex-to-binary');
const { table } = require('table');

// For outputting in text file
let total, cacheMiss, cacheHit, missPenalty, totalAccessTime, aveAccessTime, cacheMemory, numSets, blockNum;

const cacheMemorySimCtrl = {
    viewHomePage: (req, res) => res.render('HomePage'),

    viewSimpletonPage: (req, res) => res.render('SimpletonPage'),

    viewSequentialPage: (req, res) => res.render('SequentialPage'),

    viewUserGuidePage: (req, res) => res.render('UserGuide'),

    getOutputTextFile: (req, res) => {
        try {
            // converting cache to string
            let tempCache = cacheMemory;

            let cacheArray = tempCache.map(item => item.cache);
            // fill empty cells in cache with "" (empty string) for constructing table
            for (let i = 0; i < numSets; i++) {
                let j = cacheArray[i].length;
                while (j < blockNum) {
                    cacheArray[i].push('');
                    j++;
                };
            };

            for (let i = 0; i < numSets; i++)
                cacheArray[i].unshift(`Set ${i}`)

            let header = [""]
            for (let i = 0; i < blockNum; i++)
                header.push(`Block ${i}`)

            cacheArray.unshift(header)

            let cacheTable = table(cacheArray);

            let string = `Cache Hits: ${cacheHit}\nCache Misses: ${cacheMiss}\nTotal Queries: ${total}\n\nMiss Penalty: ${missPenalty}\nAverage Access Time: ${aveAccessTime} ns\nTotal Access Time: ${totalAccessTime} ns\n\nSnapshot of Cache Memory:\n${cacheTable}`;

            res.setHeader('Content-type', "application/octet-stream");
            res.setHeader('Content-disposition', 'attachment; filename=output_result.txt');

            return res.send(string);

        } catch (err) {
            // console.log(err); 
            return res.render('HomePage');
        }
    },

    /**
     * Letter B 
     */
    postTwoLoops: (req, res) => {
        let {
            tasks,
            inputType,
            blockSize,
            setSize,
            cacheSize,
            cacheSizeDropdown,
            cacheAccessTime,
            memorySize,
            memorySizeDropdown,
            memoryAccessTime
        } = req.body;

        blockSize = parseInt(blockSize);
        setSize = parseInt(setSize);
        cacheSize = parseInt(cacheSize);
        cacheAccessTime = parseInt(cacheAccessTime);
        memorySize = parseInt(memorySize);
        memoryAccessTime = parseInt(memoryAccessTime);

        //converting et al
        if (cacheSizeDropdown === 'words') {
            cacheSize = cacheSize / blockSize;
        }

        if (memorySizeDropdown === 'words') {
            memorySize = memorySize / blockSize;
        }

        // if addresses convert, else blocks mean remain the same
        if (inputType === 'addresses') {

            // error checking for memory size using addresses if input type is address
            for (i = 0; i < tasks.length; i++) {
                const memorySizeInWords = memorySize * blockSize;
                // check error
                if (parseInt(tasks[i].upperRange) >= memorySizeInWords || parseInt(tasks[i].lowerRange) >= memorySizeInWords) {
                    // console.log(tasks[i].upperRange);
                    return res.send({
                        memorySizeError: 'Memory size less than the input ranges'
                    });
                }
            }

            for (i = 0; i < tasks.length; i++) {
                // convert string to int
                tasks[i].upperRange = parseInt(tasks[i].upperRange);
                tasks[i].lowerRange = parseInt(tasks[i].lowerRange);
            
                // update values
                tasks[i].upperRange = Math.ceil((tasks[i].upperRange + 1) / blockSize) - 1;
                tasks[i].lowerRange = Math.ceil((tasks[i].lowerRange + 1) / blockSize) - 1;
            }
        }

        // error checking
        if (setSize > cacheSize) {
            return res.send({
                setSizeError: 'Set size greater than cache size'
            });
        }

        // error checking for memory size using blocks
        for (i = 0; i < tasks.length; i++) {
            // check error
            if (parseInt(tasks[i].upperRange) >= memorySize || parseInt(tasks[i].lowerRange) >= memorySize) {
                return res.send({
                    memorySizeError: 'Memory size less than the input ranges'
                });
            }
        }

        // init array
        numSets = cacheSize / setSize;
        cacheMemory = makeCache(numSets);

        // outputs
        cacheHit = 0;
        cacheMiss = 0;

        for (k = 0; k < tasks.length; k++) {

            if (parseInt(tasks[k].upperRange) >= parseInt(tasks[k].lowerRange)) {
                for (j = 0; j < parseInt(tasks[k].loopCount); j++) {
                    for (i = parseInt(tasks[k].lowerRange); i <= parseInt(tasks[k].upperRange); i++) {
                        let set = i % numSets;

                        let row = cacheMemory[set];
                        let length = row.cache.length;

                        //check if the array has same value
                        let find = row.cache.indexOf(i);

                        // if find change the length to index find
                        find !== -1 ? (length = find, cacheHit++) : cacheMiss++;

                        // if less than setSize, update value and MRU, else update value only
                        length < setSize ? (row.cache[length] = i, row.MRU = length) : row.cache[row.MRU] = i;
                    }
                }
            }
            else {
                for (j = 0; j < parseInt(tasks[k].loopCount); j++) {
                    for (i = parseInt(tasks[k].lowerRange); i >= parseInt(tasks[k].upperRange); i--) {
                        let set = i % numSets;

                        let row = cacheMemory[set];
                        let length = row.cache.length;

                        //check if the array has same value
                        let find = row.cache.indexOf(i);

                        // if find change the length to index find
                        find !== -1 ? (length = find, cacheHit++) : cacheMiss++;

                        // if less than setSize, update value and MRU, else update value only
                        length < setSize ? (row.cache[length] = i, row.MRU = length) : row.cache[row.MRU] = i;
                    }
                }
            }
        }

        total = cacheHit + cacheMiss;

        let hitRate = cacheHit / total,
            missRate = cacheMiss / total;

        missPenalty = cacheAccessTime + memoryAccessTime * blockSize + cacheAccessTime;
        totalAccessTime = cacheHit * blockSize * cacheAccessTime + cacheMiss * blockSize * (memoryAccessTime + cacheAccessTime) + cacheMiss * cacheAccessTime;

        aveAccessTime = hitRate * cacheAccessTime + missRate * missPenalty;

        blockNum = setSize;

        return res.send({
            cacheMemory: cacheMemory,
            cacheHit: cacheHit,
            cacheMiss: cacheMiss,
            missPenalty: missPenalty,
            totalAccessTime: totalAccessTime,
            aveAccessTime: aveAccessTime,
            setSize: setSize
        });

    },

    postSimpleton: (req, res) => {
        let {
            inputType,
            querySequence,
            blockSize,
            setSize,
            cacheSize,
            cacheSizeDropdown,
            cacheAccessTime,
            memorySize,
            memorySizeDropdown,
            memoryAccessTime
        } = req.body;

        let memoryWord;

        blockSize = parseInt(blockSize);
        setSize = parseInt(setSize);
        cacheSize = parseInt(cacheSize);
        cacheAccessTime = parseInt(cacheAccessTime);
        memorySize = parseInt(memorySize);
        memoryAccessTime = parseInt(memoryAccessTime);

        //conversion for cacheSize and memorySize dropdowns
        if (cacheSizeDropdown === 'words') {
            cacheSize = cacheSize / blockSize;
        }

        if (memorySizeDropdown === 'words') {
            memoryWord = memorySize;
            memorySize = memorySize / blockSize;
        }

        if (memorySizeDropdown === 'blocks') {
            memoryWord = memorySize * blockSize;
        }

        //error checking 
        if (setSize > cacheSize) {
            return res.send({
                setSizeError: 'Set size greater than cache size'
            });
        }

        numSets = cacheSize / setSize;
        cacheMemory = makeCache(numSets);

        cacheHit = 0;
        cacheMiss = 0;

        //separate for query sequence 
        let querySeq = querySequence.split(" ");
        let querySeqArray = new Array();

        let hexString, binaryString, setDecNum, decimalNumber;

        for (var i = 0; i < querySeq.length; i++) {
            if (inputType === 'addresses') {
                hexString = querySeq[i];

                hexString = hexToBinary(hexString).toString();
                decimalNumber = parseInt(hexString, 2);

                if (decimalNumber >= memoryWord)
                    return res.send({
                        memorySizeError: "Memory size less than the ones in the query sequence"
                    });
                else //convert address to block then push to querySeqArray
                    querySeqArray.push(Math.ceil((decimalNumber + 1) / blockSize) - 1);

            } else {
                if (parseInt(querySeq[i]) >= memorySize)
                    return res.send({
                        memorySizeError: "Memory size less than the ones in the query sequence"
                    });
                else
                    querySeqArray.push(parseInt(querySeq[i]));
            }
        }

        for (i = 0; i < querySeqArray.length; i++) {
            let set;

            set = querySeqArray[i] % numSets; // MM blocks mod set

            let row = cacheMemory[set];
            let length = row.cache.length;
            let find;

            //check if the array has same value
            find = row.cache.indexOf(querySeqArray[i]);

            // if find change the length to index find
            if (find !== -1) {
                length = find;;
                cacheHit++;
            } else {
                cacheMiss++;
            }

            // if less than setSize, update value and MRU, else update value only
            if (length < setSize) {
                row.cache[length] = querySeqArray[i];
                row.MRU = length;
            } else {
                row.cache[row.MRU] = querySeqArray[i];
            }
        }

        total = cacheHit + cacheMiss;

        let hitRate = cacheHit / total,
            missRate = cacheMiss / total;

        missPenalty = cacheAccessTime + memoryAccessTime * blockSize + cacheAccessTime;
        totalAccessTime = cacheHit * blockSize * cacheAccessTime + cacheMiss * blockSize * (memoryAccessTime + cacheAccessTime) + cacheMiss * cacheAccessTime;

        aveAccessTime = hitRate * cacheAccessTime + missRate * missPenalty;

        blockNum = setSize;

        return res.send({
            cacheMemory: cacheMemory,
            cacheHit: cacheHit,
            cacheMiss: cacheMiss,
            missPenalty: missPenalty,
            totalAccessTime: totalAccessTime,
            aveAccessTime: aveAccessTime,
            setSize: setSize
        });
    }
};

module.exports = cacheMemorySimCtrl;