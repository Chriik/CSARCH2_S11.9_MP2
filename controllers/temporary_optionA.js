// Algorithm Draft for Option A

/*
 a. Inputs:
    Lower range of blocks/address
    Upper range of blocks/address
    Number of times it will loop
    Block size (i.e. 1 block = ? words)
    Set Size (i.e. 1 set = ? blocks)
    MM memory size (either blocks or words)
    Cache memory size (either blocks or words)
    Cache access time
    Memory access time
 */

// Given
const lowerRange = 0;       // (in address)
const upperRange = 4351;     // (in address)
const nTimes = 10;          // number of times to loop
const blockSize = 64        // 1 block = 64 words
const setSize = 4;          // 1 set = 4 blocks
const memorySize = 1048576  // 1M words (2^20)
const cacheSize = 4096      // 4K words (2^12)
const cacheAccessTime = 1
const memoryAccessTime = 10

// Computed values
const numberOfCacheBlocks = cacheSize/blockSize;
const numberOfSets = numberOfCacheBlocks/setSize;

// Solving for the bits in the TAG-SET-WORD fields of main memory address
const totalBits = Math.log2(memorySize);
const wordField = Math.log2(blockSize);
const setField = Math.log2(numberOfSets);
const tagField = totalBits - setField - wordField;
console.log(`TAG = ${tagField}, SET = ${setField}, WORD = ${wordField}`);

// Solution
const numberOfBlocks = (upperRange - lowerRange + 1)/blockSize; // number of blocks to ACCESS

// Create table of hit and miss table for each iteration
let hitMissTable = []   //1st column - hit, 2nd column - miss
let cacheTable = initializeCacheTable(setSize, numberOfSets);   // row - set #, column - block #; [value, age]

for (let i = 0; i < nTimes; i++) {
    let hitCount = 0;
    let missCount = 0;

    for (let blockNumber = 0; blockNumber < numberOfBlocks; blockNumber++) {
        //check which set number to put block # __
        let setNumber = blockNumber % numberOfSets;

        if (isAlreadyInCache(cacheTable, blockNumber)) {
            hitCount++;
            updateMostRecent(cacheTable, setNumber, blockNumber);
        }
        else {
            missCount++;
            transferToCache(cacheTable, setNumber, blockNumber);
            updateMostRecent(cacheTable, setNumber, blockNumber);
        }
    }
    hitMissTable.push([hitCount, missCount]);
}

console.table(cacheTable);
console.table(hitMissTable);

const totalHitCount = getTotalHitCount(hitMissTable);
const totalMissCount = getTotalMissCount(hitMissTable);
console.log(`Total Hit Count: ${totalHitCount}`);
console.log(`Total Miss Count: ${totalMissCount}`);
const totalAccessTime = (totalHitCount * blockSize * cacheAccessTime) +
    (totalMissCount * blockSize * (memoryAccessTime + cacheAccessTime)) +
    (totalMissCount * cacheAccessTime);

console.log(`Total Access Time: ${totalAccessTime} ns`);





/*  VISUALIZATION OF CACHE TABLE
 *
 *      BLOCK
 *          0       1
 *  SET 0   (x,y)   (x,y)
 *      1   (x,y)   (x,y)
 *      2   (x,y)   (x,y)
 *      3   (x,y)   (x,y)
 *      4   (x,y)   (x,y)
 *
 *  WHERE: x = blockNumber, y = <boolean> true if most recent, otherwise false
 */


// Function declarations
function getTotalHitCount (hitMissTable) {
    let total = 0;
    for (let i = 0; i < hitMissTable.length; i++)
        total = total + hitMissTable[i][0];
    return total;
}

function getTotalMissCount (hitMissTable) {
    let total = 0;
    for (let i = 0; i < hitMissTable.length; i++)
        total = total + hitMissTable[i][1];
    return total;
}


function transferToCache (cacheTable, setNumber, blockNumber) {
    let set = cacheTable[setNumber];
    let index = getSetCellIndex(cacheTable, setNumber);
    set[index][0] = blockNumber;    // insert cell (x,y)
}

function updateMostRecent (cacheTable, setNumber, blockNumber) {
    let set = cacheTable[setNumber];
    for (let i = 0; i < set.length; i++) {
        if (set[i][0] === blockNumber)
            set[i][1] = true;
        else
            set[i][1] = false;
    }
}

function getSetCellIndex (cacheTable, setNumber) {
    let set = cacheTable[setNumber];
    let index;
    for (let i = 0; i < set.length; i++) {
        if (set[i][0] === null) {
            index = i;
            break;
        }
        else if (set[i][1] === true) {
            index = i;
        }
    }
    return index;
}

function initializeCacheTable (setSize, numberOfSets) {
    let table = [];

    for (let i = 0; i < numberOfSets; i++) {
        let row = []
        for (let j = 0; j < setSize; j++)
            row.push([null, false]);
        table.push(row);
    }
    return table;
}

function isAlreadyInCache (cacheTable, blockNumber) {
    return cacheTable.some(row => row.some(col => col[0] === blockNumber));
}

