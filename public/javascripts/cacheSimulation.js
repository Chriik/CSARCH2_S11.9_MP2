$(document).ready(function() {
    //Disable "Save to File" Button
    $('#saveToFileButton').prop('disabled', true);

    // Initialize first selected value to blocks
    $('#cacheSizeDropdown').val('blocks');
    $('#cacheSizeDropdown').text('blocks');
    $('#memorySizeDropdown').val('blocks');
    $('#memorySizeDropdown').text('blocks');
});

// For clearing all inputs and outputs (RESET)
$('#resetButton').on("click", function() {
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
    $('.lower-range').each(function() { this.value = ''; });
    $('.upper-range').each(function() { this.value = ''; });
    $('.loop-count').each(function() { this.value = ''; });

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

    // Reset dropdowns
    $('#cacheSizeDropdown').val('blocks');
    $('#cacheSizeDropdown').text('blocks');
    $('#memorySizeDropdown').val('blocks');
    $('#memorySizeDropdown').text('blocks');

    // Disable saveToFile button
    $('#saveToFileButton').prop('disabled', true);

    // Clear errors
    $('input').each(function() { $(this).removeClass('is-invalid'); });
    $('.input-error').each(function() { $(this).text(''); });
});

$('#saveToFileButton').on('click', function() {
    window.location.href = '/outputTextFile';
});

// For Cache Size Dropdown Button
$('#cacheSizeDropdown').on('click', function() {
    if ($('#cacheSizeOptions').css('display') === 'none')
        $('#cacheSizeOptions').css('display', 'block');
    else
        $('#cacheSizeOptions').css('display', 'none');
});
$('#cacheSizeOptions a').on('click', function() {
    $('#cacheSizeDropdown').val($(this).text()).text($(this).text());
    $('#cacheSizeOptions').css('display', 'none');
});

// For Memory Size Dropdown Button
$('#memorySizeDropdown').on('click', function() {
    if ($('#memorySizeOptions').css('display') === 'none')
        $('#memorySizeOptions').css('display', 'block');
    else
        $('#memorySizeOptions').css('display', 'none');
});
$('#memorySizeOptions a').on('click', function() {
    $('#memorySizeDropdown').val($(this).text()).text($(this).text());
    $('#memorySizeOptions').css('display', 'none');
});