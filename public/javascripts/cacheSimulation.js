$(document).ready(function() {
    // FIXME: to be deleted in the future!
    $.post ('/TwoLoops');

});

// For adding additional tasks
$('#addTask').on("click", function() {
    let currentNumberOfTasks = $('.task-group').length
    let nextTaskNumber = currentNumberOfTasks + 1;

    let taskGroup =
        `<div class="task-group">
              <div class="row"><h3>Task ${nextTaskNumber}</h3></div>
              <div class="row">
                  <div class="form-group col-4">
                      <label for="lowerRange">Lower Range</label>
                      <input type="number" class="form-control form-control-sm" id="lowerRange">
                  </div>
    
                  <div class="form-group col-4">
                      <label for="upperRange">Upper Range</label>
                      <input type="number" class="form-control form-control-sm" id="upperRange">
                  </div>
    
                  <div class="form-group col-4">
                      <label for="loopCount">Loop count</label>
                      <input type="number" class="form-control form-control-sm" id="loopCount">
                  </div>
              </div>
         </div>`;

    $('#taskList').append(taskGroup)
});

// For removing task (removes the last task on the taskList)
$('#removeTask').on("click", function() {
    let currentNumberOfTasks = $('.task-group').length

    if (currentNumberOfTasks > 1) {
        $('.task-group').last().remove();
    }
});