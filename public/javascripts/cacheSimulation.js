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

    // A Task object has attributes: lowerRange, upperRange, loopCount
    let tasks = getArrayOfTasks();

    // TODO: include other inputs to send to server
    $.post('/', {
            tasks: tasks

        }, function(data) {
            console.log("something")
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

// For clearing all inputs (RESET)
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

    // TODO: reset dropdown for cache size and memory size

});



