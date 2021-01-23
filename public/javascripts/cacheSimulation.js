$(document).ready(function() {
    // FIXME: to be deleted in the future!
    $.post ('/TwoLoops');

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
                  </div>

                  <div class="form-group col-4">
                      <label for="upperRange-${nextTaskNumber}">Upper Range</label>
                      <input type="number" class="form-control form-control-sm upper-range" id="lowerRange-${nextTaskNumber}">
                  </div>

                  <div class="form-group col-4">
                      <label for="loopCount-${nextTaskNumber}">Loop count</label>
                      <input type="number" class="form-control form-control-sm loop-count" id="lowerRange-${nextTaskNumber}">
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
    let inputType = $('#inputType').val();
    let wordSize = $('#wordSize').val();
    let blockSize = $('#blockSize').val();
    let setSize = $('#setSize').val();
    let cacheSize = $('#cacheSize').val();
    let cacheAccessTime = $('#cacheTime').val();
    let memorySize = $('#memorySize').val();
    let memoryAccessTime = $('#memoryTime').val();
    let cacheSizeDropdown = 'TODO';
    let memorySizeDropdown = 'TODO';

    // TODO: validate? error trap inputs?
    // pass

    // TODO: include other inputs to send to server
    $.post('/TwoLoops', {
            tasks: tasks,
            inputType: inputType,
            wordSize: wordSize,
            blockSize: blockSize,
            setSize: setSize,
            cacheSize: cacheSize,
            cacheAccessTime: cacheAccessTime,
            memorySize: memorySize,
            memoryAccessTime: memoryAccessTime

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

});

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

// For clearing all inputs and outputs (RESET)
$('#resetButton').on("click", function () {
    // Reset input type dropdown
    let options = $('#inputType option').map(function() { return this.value; }).get();
    $('#inputType').val(options[0]);

    $('#wordSize').val('');
    $('#blockSize').val('');
    $('#setSize').val('');
    $('#cacheSize').val('');
    $('#cacheTime').val('');
    $('#memorySize').val('');
    $('#memoryTime').val('');

    // Clear all Task inputs
    $('.lower-range').each(function () { this.value = ''; });
    $('.upper-range').each(function () { this.value = ''; });
    $('.loop-count').each(function () { this.value = ''; });

    // Clear results/cache table
    $('#cacheTable').remove();
    $('#cacheMisses').val('');
    $('#cacheHits').val('');
    $('#totalQueries').val('');
    $('#missPenalty').val('');
    $('#averageTime').val('');
    $('#totalTime').val('');

    // Show dummy table
    $('#dummyTable').show();

    // TODO: reset dropdown for cache size and memory size
    // pass

});

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



