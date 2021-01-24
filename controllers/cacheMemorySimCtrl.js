const fs = require('fs');
const path = require('path');

const { makeCache } = require('../modules/cacheFunc');

// For outputing in text file
let total, cacheMiss, cacheHit, missPenalty, totalAccessTime, aveAccessTime;

const cacheMemorySimCtrl = {
    viewHomePage: (req, res) => res.render('HomePage'),

    viewSimpletonPage: (req, res) => res.render('SimpletonPage'),

    viewSequentialPage: (req, res) => res.render('SequentialPage'),

    /**
     * Letter B 
     */
    postTwoLoops: (req, res) => {
        // TODO: include other inputs
        let { 
            tasks, 
            inputType, 
            wordSize, 
            blockSize,
            setSize,
            cacheSize,
            cacheSizeDropdown,
            cacheAccessTime,
            memorySize,
            memorySizeDropdown,
            memoryAccessTime } = req.body;

        // FIXME: to be removed in the future
        // 16 sets = 4blocks
        // let wordSize = 16,       // bits
        //     blockSize = 128,     // words
        //     setSize = 4,         // blocks 
        //     cacheSize = 64,
        //     cacheSizeDropdown = 'blocks',  // block or words
        //     memorySize = 128,
        //     memorySizeDropdown = 'blocks', // block or words
        //     inputType= 'blocks',    // blocks or addresses 
        //     firstUpper = 1,
        //     firstLower = 1,
        //     firstTime = 10,
        //     secondUpper = 67,
        //     secondLower = 0,
        //     secondTime = 10;

        console.log(tasks);


        //converting et al
        if (cacheSizeDropdown === 'words') {
            cacheSize = cacheSize / blockSize; 
        }

        if (memorySizeDropdown === 'words') {
            memorySize = memorySize / blockSize;
        }

        // if addresses convert, else blocks mean remain the same
        if (inputType === 'addresses') {
            //for (i =0, i<)

            // convert first loop
            let numberOfBlocks = (firstUpper - firstLower + 1)/blockSize; // number of blocks to ACCESS

            // update values
            firstUpper = firstLower + numberOfBlocks - 1;

            // convert second loop
            numberOfBlocks = (secondUpper - secondLower + 1)/blockSize;

            // update values
            secondUpper = secondLower + numberOfBlocks - 1;
        }
        
        // error checking
        if (setSize > cacheSize) {
            console.log('error');
            // TODO: render error message
        }

        if (firstUpper > memorySize || firstLower > memorySize || secondUpper > memorySize || secondLower > memorySize) {
            console.log('error');
            // TODO: render error message
        }
        
        // init array
        let numSets = cacheSize / setSize; 
        var cacheMemory = makeCache(numSets);

        // outputs
        cacheHit = 0;
        cacheMiss = 0;

        // first loop
        for (j=0; j<firstTime; j++){
            for (i=firstLower; i<=firstUpper; i++) {
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

        total = cacheHit + cacheMiss;

        let hitRate = cacheHit / total,
            missRate = cacheMiss / total;

        missPenalty = cacheAccessTime + memoryAccessTime * blockSize + cacheAccessTime;
        totalAccessTime = cacheHit * blockSize * cacheAccessTime + cacheMiss * blockSize * memoryAccessTime + cacheMiss * cacheAccessTime;

        aveAccessTime = hitRate * cacheAccessTime + missRate * missPenalty;
       
        console.log(cacheMemory);
        console.log(cacheHit);
        console.log(cacheMiss);
        console.log(missPenalty);
        console.log(totalAccessTime);
        console.log(aveAccessTime);

        // output text file TODO: add res.download if there is a link already
        let filepath = path.join(__dirname, '../outputs', 'output_result.txt');

        // converting cache to string
        let tempCache = cacheMemory;

        let lengths = tempCache.map(item => item.cache);
        
        tempCache = '';
        for (i=0; i<numSets; i++)
            tempCache += `Set ${i}       ${lengths[i].join(',    ')}\n`;

        let stream = fs.createWriteStream(filepath);
        stream.once('open', function(fd) {
                stream.write(`Cache Hits: ${cacheHit}\n`);
                stream.write(`Cache Misses: ${cacheMiss}\n`);
                stream.write(`Total Queries: ${total}\n\n`);
                stream.write(`Miss Penalty: ${missPenalty}\n`);
                stream.write(`Average Access Time: ${aveAccessTime}\n`);
                stream.write(`Total Access Time: ${totalAccessTime}\n\n`);
                stream.write(`Snapshot of Cache Memory:\n`);
                stream.write(`---------------------------------------------------\n`);
                stream.write(`${tempCache}`);
                stream.end();
        });

        res.send({
            cacheMemory: cacheMemory,
            cacheHit: cacheHit,
            cacheMiss: cacheMiss,
            missPenalty: missPenalty,
            totalAccessTime: totalAccessTime,
            aveAccessTime: aveAccessTime
        });

    },
};

module.exports = cacheMemorySimCtrl;