let keyInput = {
    query:          $('#querySequence'),
    word:           $('#wordSize'),
    block:          $('#blockSize'),
    set:            $('#setSize'),
    cache:          $('#cacheSize'),
    cacheTime:      $('#cacheTime'),
    memory:         $('#memorySize'),
    memoryTime:     $('#memoryTime')
};

// AJAX post
$('#simulateSimpleton').on("click", function() {

    // Get all inputs
    let inputType = $('#inputType').val().trim();
    let querySequence = $('#querySequence').val().trim(); 
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
    // TODO: add error checking for syntax on query sequence
    let valid = true;

    if (!querySequence) {
        valid = false;
        setError('query', 'Missing input');
    } else {
        clearError('query');
    }

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

    // TODO: simpleton back end
    if (valid) {

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