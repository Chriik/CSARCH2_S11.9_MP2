$(document).ready(function() {
    //Disable "Save to File" Button
    $('#saveToFileButton').prop('disabled', true);

});

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