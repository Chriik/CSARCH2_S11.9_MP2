let keyInput = {
    word:           $('#wordSize'),
    block:          $('#blockSize'),
    set:            $('#setSize'),
    cache:          $('#cacheSize'),
    cacheTime:      $('#cacheTime'),
    memory:         $('#memorySize'),
    memoryTime:     $('#memoryTime')
};
let keyTasks;

$(document).ready(function() {
    //Disable "Save to File" Button
    $('#saveToFileButton').prop('disabled', true);

});

// For adding additional tasks
$('#addTaskButton').on("click", function() {
    let currentNumberOfTasks = $('.task-group').length;
    let nextTaskNumber = currentNumberOfTasks + 1;

    let taskGroup =
        `<div class="task-group">
              <div class="row"><h3>Task ${nextTaskNumber}</h3></div>
              <div class="row">
                  <div class="form-group col-4">
                      <label for="lowerRange-${nextTaskNumber}">Lower Range</label>
                      <input type="number" class="form-control form-control-sm lower-range" id="lowerRange-${nextTaskNumber}">
                      <small id="lowerError-${nextTaskNumber}" class="text-danger input-error"></small>
                  </div>

                  <div class="form-group col-4">
                      <label for="upperRange-${nextTaskNumber}">Upper Range</label>
                      <input type="number" class="form-control form-control-sm upper-range" id="upperRange-${nextTaskNumber}">
                      <small id="upperError-${nextTaskNumber}" class="text-danger input-error"></small>
                  </div>

                  <div class="form-group col-4">
                      <label for="loopCount-${nextTaskNumber}">Loop count</label>
                      <input type="number" class="form-control form-control-sm loop-count" id="loopCount-${nextTaskNumber}">
                      <small id="loopError-${nextTaskNumber}" class="text-danger input-error"></small>
                  </div>
              </div>
         </div>`;

    $('#taskList').append(taskGroup);
});

// For removing task (removes the last task on the taskList)
$('#removeTaskButton').on("click", function() {
    let currentNumberOfTasks = $('.task-group').length;

    if (currentNumberOfTasks > 1) {
        $('.task-group').last().remove();
    }
});

// AJAX post
$('#simulateButton').on("click", function() {

    // Get all inputs
    // A Task object has attributes: lowerRange, upperRange, loopCount
    let tasks = getArrayOfTasks();
    let inputType = $('#inputType').val().trim();
    let wordSize = $('#wordSize').val().trim();
    let blockSize = $('#blockSize').val().trim();
    let setSize = $('#setSize').val().trim();
    let cacheSize = $('#cacheSize').val().trim();
    let cacheAccessTime = $('#cacheTime').val().trim();
    let memorySize = $('#memorySize').val().trim();
    let memoryAccessTime = $('#memoryTime').val().trim();

    //TODO: on monday
    let cacheSizeDropdown = 'blocks';
    let memorySizeDropdown = 'blocks';

    // error checking for missing inputs, power of 2 ..
    let valid = true;

    if (!wordSize) {
        valid = false;
        setError('word', 'Missing input');
    } else if (!Number.isInteger(parseInt(wordSize))) {
        valid = false;
        setError('word', 'Not an integer');
    } else if (!isPowerOf2(wordSize)) {
        valid = false;
        setError('word', 'Not a power of 2');
    } else {
        clearError('word');
    }

    if (!blockSize) {
        valid = false;
        setError('block', 'Missing input');
    } else if (!Number.isInteger(parseInt(blockSize))) {
        valid = false;
        setError('block', 'Not an integer');
    } else if (!isPowerOf2(blockSize)) {
        valid = false;
        setError('block', 'Not a power of 2');
    } else {
        clearError('block');
    }

    if (!setSize) {
        valid = false;
        setError('set', 'Missing input');
    } else if (!Number.isInteger(parseInt(setSize))) {
        valid = false;
        setError('set', 'Not an integer');
    } else if (!isPowerOf2(setSize)) {
        valid = false;
        setError('set', 'Not a power of 2');
    } else {
        clearError('set');
    }

    if (!cacheSize) {
        valid = false;
        setError('cache', 'Missing input');
    } else if (!Number.isInteger(parseInt(cacheSize))) {
        valid = false;
        setError('cache', 'Not an integer');
    } else if (!isPowerOf2(cacheSize)) {
        valid = false;
        setError('cache', 'Not a power of 2');
    } else {
        clearError('cache');
    }

    if (!cacheAccessTime) {
        valid = false;
        setError('cacheTime', 'Missing input');
    } else if (!Number.isInteger(parseInt(cacheAccessTime))) {
        valid = false;
        setError('cacheTime', 'Not an integer');
    } else {
        clearError('cacheTime');
    }

    if (!memorySize) {
        valid = false;
        setError('memory', 'Missing input');
    } else if (!Number.isInteger(parseInt(memorySize))) {
        valid = false;
        setError('memory', 'Not an integer');
    } else if (!isPowerOf2(memorySize)) {
        valid = false;
        setError('memory', 'Not a power of 2');
    } else {
        clearError('memory');
    }

    if (!memoryAccessTime) {
        valid = false;
        setError('memoryTime', 'Missing input');
    } else if (!Number.isInteger(parseInt(memoryAccessTime))) {
        valid = false;
        setError('memoryTime', 'Not an integer');
    } else {
        clearError('memoryTime');
    }

    // error check for tasks
    let currentNumberOfTasks = $('.task-group').length;

    for (let i = 1 ; i <= currentNumberOfTasks; i++ ) {
        let lower = $(`#lowerRange-${i}`).val().trim();
        let upper = $(`#upperRange-${i}`).val().trim();
        let loop = $(`#loopCount-${i}`).val().trim();

        keyTasks = {
            lower:      $(`#lowerRange-${i}`),
            upper:      $(`#upperRange-${i}`),
            loop:       $(`#loopCount-${i}`)
        }

        if (!lower) {
            valid = false;
            setErrorTasks('lower', 'Missing input', i);
        } else if (!Number.isInteger(parseInt(lower))) {
            valid = false;
            setError('lower', 'Not an integer');
        } else {
            clearErrorTasks('lower', i);
        }

        if (!upper) {
            valid = false;
            setErrorTasks('upper', 'Missing input', i);
        } else if (!Number.isInteger(parseInt(upper))) {
            valid = false;
            setError('upper', 'Not an integer');
        } else {
            clearErrorTasks('upper', i);
        }

        if (!loop) {
            valid = false;
            setErrorTasks('loop', 'Missing input', i);
        } else if (!Number.isInteger(parseInt(loop))) {
            valid = false;
            setError('loop', 'Not an integer');
        } else {
            clearErrorTasks('loop', i);
        }
        
        if ((upper && lower) && parseInt(lower) > parseInt(upper)) {
            setErrorTasks('lower', 'Lower range is greater than upper range', i);
        }
    }

    // TODO: include other inputs to send to server
    if (valid) {
        $.post('/TwoLoops', {
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
                memoryAccessTime,
            }, function(data) {
                // Show results
                loadCacheTable(data.cacheMemory)
                $('#cacheMisses').val(data.cacheMiss);
                $('#cacheHits').val(data.cacheHit);
                $('#totalQueries').val(data.cacheHit + data.cacheMiss);
                $('#missPenalty').val(data.missPenalty);
                $('#averageTime').val(data.aveAccessTime);
                $('#totalTime').val(data.totalAccessTime);

            }
        );
    }
});

// Sets the error message and change the input to red
function setError (key, err) {
    keyInput[key].addClass('is-invalid');
    $(`#${key}Error`).text(err);
};

// Clears the error message and remove the input to red class
function clearError (key) {
    keyInput[key].removeClass('is-invalid');
    $(`#${key}Error`).text('');
}

// Sets the error message and change the input to red [TASKS]
function setErrorTasks (key, err, i) {
    keyTasks[key].addClass('is-invalid');
    $(`#${key}Error-${i}`).text(err);
};

// Clears the error message and remove the input to red class [TASKS]
function clearErrorTasks (key, i) {
    keyTasks[key].removeClass('is-invalid');
    $(`#${key}Error-${i}`).text('');
}

// If number is power of 2, return 1, else return 0.
function isPowerOf2 (number) {
    if (number == 0) { 
        return 0; 
    }

    while (number != 1) {
        number = number / 2;
        if (number % 2 != 0 && number != 1) { 
            return 0; 
        }
    }
    return 1;
}


// Returns array containing Task objects
function getArrayOfTasks () {
    let currentNumberOfTasks = $('.task-group').length;
    let lowerRangeArray = $('.lower-range').map(function() { return this.value; }).get();
    let upperRangeArray = $('.upper-range').map(function() { return this.value; }).get();
    let loopCountArray = $('.loop-count').map(function() { return this.value; }).get();
    let tasks = [];

    for (let i = 0; i < currentNumberOfTasks; i++) {
        tasks.push({
            lowerRange: lowerRangeArray[i],
            upperRange: upperRangeArray[i],
            loopCount: loopCountArray[i]
        });
    }
    return tasks;
}

// Renders Cache Memory to table
function loadCacheTable (cacheMemory) {
    // Hide the Dummy table (for reset purposes!)
    $('#dummyTable').hide();

    // Create new table showing cache memory
    let table = $(`<table class="table table-bordered" id="cacheTable">
                        <thead>
                            <tr>
                                <th scope="col">Set</th>
                                <th colspan="${cacheMemory[0].cache.length}"></th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                        </tbody>
                    </table>`
    );

    for (let i = 0; i < cacheMemory.length; i++) {
        let row = $(`<tr><th scope="row">${i}</th></tr>`);

        for (let j = 0; j < cacheMemory[0].cache.length; j++) {
            row.append(`<td>${cacheMemory[i].cache[j]}</td>`);
        }
        table.append(row);
    }

    // Append table to <div> tableHolder
    $('#tableHolder').append(table);
}



