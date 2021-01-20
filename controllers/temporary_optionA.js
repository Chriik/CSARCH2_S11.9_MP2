// Algorithm Draft for Option A (IN PROGRESS)

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
cacheTable[1][1][1] = 3
console.table(cacheTable);
console.log(cacheTable.includes(3))




// Function declarations
function initializeCacheTable(setSize, numberOfSets) {
    let table = [];

    for (let i = 0; i < numberOfSets; i++) {
        let row = []
        for (let j = 0; j < setSize; j++)
            row.push([null, null]);
        table.push(row);
    }
    return table;
}
