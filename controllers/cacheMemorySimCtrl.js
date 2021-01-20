const { makeCache } = require('../modules/cacheFunc');

const cacheAccessTime = 1;
const memoryAccessTime = 10;

const cacheMemorySimCtrl = {
    viewSimulationPage: (req, res) => res.render('simulationPage'),

    /**
     * Letter B 
     */
    postTwoLoops: (req, res) => {
        /** 
         * change to input from html side
        */

        // 16 sets = 4blocks
        let wordSize = 16,       // bits
            blockSize = 128,     // words
            setSize = 4,         // blocks 
            cacheSize = 64,
            cacheSizeUnit = 'block',  // block or words
            memorySize = 128,
            memorySizeUnit = 'block', // block or words
            system = 'decimal',         // hexa or decimal
            systemInput = 'blocks',    // blocks or addresses 
            firstUpper = 1   
            firstLower = 1,
            firstTime = 10,
            secondUpper = 67,
            secondLower = 0,
            secondTime = 10;

        //converting et al
        if (cacheSizeUnit === 'words') {
            cacheSize = cacheSize / blockSize; 
        }

        if (memorySizeUnit === 'words') {
            memorySize = memorySize / blockSize;
        }

        if (systemInput === 'addresses') {
            if (system === 'decimal') {

            } else if (system === 'hexadecimal') {

            }

        }


        // Error Trap + add also cacheSize >= setSize
        /**
         * Error checking:
            the "simulation input" should be within the MM memory size. Meaning if MM has 128 blocks. But input mention block 130. Then, error trap/check.
         */
        
        //For block and memory


        // init array
        let numSets = cacheSize / setSize; 
        var cacheMemory = makeCache(numSets);

        // outputs
        let cacheHit = 0,
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

        // second loop
        for (j=0; j<secondTime; j++){
            for (i=secondLower; i<=secondUpper; i++) {
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

        let total = cacheHit + cacheMiss;
        let hitRate = cacheHit / total,
            missRate = cacheMiss / total;

        let missPenalty = cacheAccessTime + memoryAccessTime * blockSize + cacheAccessTime,
            totalAccessTime = cacheHit * blockSize * cacheAccessTime + cacheMiss * blockSize * memoryAccessTime + cacheMiss * cacheAccessTime;

        let aveAccessTime = hitRate * cacheAccessTime + missRate * missPenalty;
       
        console.log(cacheMemory);
        console.log(cacheHit);
        console.log(cacheMiss);
        console.log(missPenalty);
        console.log(totalAccessTime);
        console.log(aveAccessTime);

    },
};

module.exports = cacheMemorySimCtrl;