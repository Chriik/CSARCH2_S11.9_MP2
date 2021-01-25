//creating the table
let getSetIndex, getCol;
let found = false;
let cacheHit = 0;
let cacheMiss = 0;
let table = [];

console.log(`NumSets: ${numSets}`);

//initiate
for (var i = 0; i < numSets; i++) {
    let blockTemp = [];
    for (var j = 0; j < setSize; j++) {
        blockTemp.push({ 'val': null, 'age': 0 });
    }
    console.table(blockTemp);

    let setTemp = []
    setTemp.push(blockTemp);
    console.table(setTemp);
    setTemp = setTemp;
    console.log(setTemp[0][1]);

    table.push(setTemp);

}
// console.table(table);
// console.table(table[0]);
console.log("test");
let test = table[1];
test = test[0][1];
// console.log(test);
test = test.age;
// console.log(test);

for (var i = 0; i < querySeqArray.length; i++) {
    console.log("inside");
    if (inputType === 'blocks') {
        getSetIndex = querySeqArray[i] % numSets;
        console.log(`getSetIndex: ${getSetIndex}`);
        //Set table it belongs
        let setNum = []
        setNum = table[getSetIndex];
        console.table(setNum);
        found = false;

        //#TODO: reset all the age to 0
        for (var j = 0; j < setSize & !found; j++) {
            let temp = setNum[0][j]
            console.log(temp);
            temp.age = 0;
        }

        for (var j = 0; j < setSize & !found; j++) {
            //check if it exists
            if (setNum[0][j].val === querySeqArray[i]) {
                //change existing 1 for age
                setNum[0][j].age = 1;
                cacheHit += 1;
                found = true;
            }
            //check if null
            else if (setNum[0][setSize].val === null) {
                setNum[0][setSize].age = 1;
                cacheMiss += 1;
                found = true;
            }
        }

        for (var j = 0; j < setSize & !found; j++) {
            //#TODO: reset all the age to 0

            //check if there's a 1
            if (setNum[0][setSize].age === 1) {
                //change the value to the new value
                setNum[0][setSize].value = querySeqArray[i];
                cacheMiss += 1;
                found = true;
            }
        }
    }
} //delete here