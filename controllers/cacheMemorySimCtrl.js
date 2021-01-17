const cacheAccessTime = 1;
const memoryAcessTime = 10;

function makeCache (d1) {
    var arr = new Array(d1), i, l;
    for (i=0, l=d1; i<l; i++) {
        arr[i] = {
            MRU: null,
            cache: new Array()
        };
    }
    return arr;
}

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
            firstUpper = 67   
            firstLower = 0,
            firstTime = 10,
            secondUpper = '',
            secondLower = '',
            secondTime = '';

        //converting et al

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
        for (j=0; j<2; j++){
            for (i=firstLower; i<=firstUpper; i++) {
                let set = i % numSets;

                let row = cacheMemory[set];
                let length = row.cache.length;

                //check if the array has same value
                let find = row.cache.indexOf(i);
                
                console.log(i);
                console.log(find);
                console.log('');

                if (find != -1) {
                    length = find;
                    cacheHit++;
                } else {
                    cacheMiss++;
                }

                if (length < setSize) {
                    row.cache[length] = i;
                    row.MRU = length;
                } else {
                    // change the value with the MRU
                    row.cache[row.MRU] = i;
                }

            }
        }

        // second loop

        console.log(cacheMemory);
        console.log(cacheHit);
        console.log(cacheMiss);

    },
};

module.exports = cacheMemorySimCtrl;