let keyInput = {
    query: $('#querySequence'),
    word: $('#wordSize'),
    block: $('#blockSize'),
    set: $('#setSize'),
    cache: $('#cacheSize'),
    cacheTime: $('#cacheTime'),
    memory: $('#memorySize'),
    memoryTime: $('#memoryTime')
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
    } else if (!Number.isInteger(parseInt(wordSize)) || !(parseInt(wordSize) > 0)) {
        valid = false;
        setError('word', 'Not a positive integer');
    } else if (!isPowerOf2(parseInt(wordSize))) {
        valid = false;
        setError('word', 'Not a power of 2');
    } else {
        clearError('word');
    }

    if (!blockSize) {
        valid = false;
        setError('block', 'Missing input');
    } else if (!Number.isInteger(parseInt(blockSize)) || !(parseInt(blockSize) > 0)) {
        valid = false;
        setError('block', 'Not a positive integer');
    } else if (!isPowerOf2(parseInt(blockSize))) {
        valid = false;
        setError('block', 'Not a power of 2');
    } else {
        clearError('block');
    }

    if (!setSize) {
        valid = false;
        setError('set', 'Missing input');
    } else if (!Number.isInteger(parseInt(setSize)) || !(parseInt(setSize) > 0)) {
        valid = false;
        setError('set', 'Not a positive integer');
    } else if (!isPowerOf2(parseInt(setSize))) {
        valid = false;
        setError('set', 'Not a power of 2');
    } else {
        clearError('set');
    }

    if (!cacheSize) {
        valid = false;
        setError('cache', 'Missing input');
    } else if (!Number.isInteger(parseInt(cacheSize)) || !(parseInt(cacheSize) > 0)) {
        valid = false;
        setError('cache', 'Not a positive integer');
    } else if (!isPowerOf2(parseInt(cacheSize))) {
        valid = false;
        setError('cache', 'Not a power of 2');
    } else {
        clearError('cache');
    }

    if (!cacheAccessTime) {
        valid = false;
        setError('cacheTime', 'Missing input');
    } else if (!Number.isInteger(parseInt(cacheAccessTime)) || !(parseInt(cacheAccessTime) > 0)) {
        valid = false;
        setError('cacheTime', 'Not a positive integer');
    } else {
        clearError('cacheTime');
    }

    if (!memorySize) {
        valid = false;
        setError('memory', 'Missing input');
    } else if (!Number.isInteger(parseInt(memorySize)) || !(parseInt(memorySize) > 0)) {
        valid = false;
        setError('memory', 'Not a positive integer');
    } else if (!isPowerOf2(parseInt(memorySize))) {
        valid = false;
        setError('memory', 'Not a power of 2');
    } else {
        clearError('memory');
    }

    if (!memoryAccessTime) {
        valid = false;
        setError('memoryTime', 'Missing input');
    } else if (!Number.isInteger(parseInt(memoryAccessTime)) || !(parseInt(memoryAccessTime) > 0)) {
        valid = false;
        setError('memoryTime', 'Not a positive integer');
    } else {
        clearError('memoryTime');
    }

    // TODO: simpleton back end
    if (valid) {
        removeCacheTable();
        $.post('/Simpleton', {
            inputType,
            querySequence,
            wordSize,
            blockSize,
            setSize,
            cacheSize,
            cacheSizeDropdown,
            cacheAccessTime,
            memorySize,
            memorySizeDropdown,
            memoryAccessTime
        }, function(data) {

            let valid_post = true;

            console.log(data);

            if (data.memorySizeError) {
                valid_post = false;
                setError('memory', data.memorySizeError);
            }

            if (data.setSizeError) {
                valid_post = false;
                setError('set', data.setSizeError);
            }

            if (valid_post) {
                loadCacheTable(data.cacheMemory);
                $('#cacheMisses').val(data.cacheMiss);
                $('#cacheHits').val(data.cacheHit);
                $('#totalQueries').val(data.cacheHit + data.cacheMiss);
                $('#missPenalty').val(data.missPenalty);
                $('#averageTime').val(data.aveAccessTime);
                $('#totalTime').val(data.totalAccessTime);

                $('#saveToFileButton').prop('disabled', false);
                scrollToCacheResults();
            }
        });
    }

    function removeCacheTable() {
        $('#cacheTable').remove();
    }
});

// Sets the error message and change the input to red
function setError(key, err) {
    keyInput[key].addClass('is-invalid');
    $(`#${key}Error`).text(err);
};

// Clears the error message and remove the input to red class
function clearError(key) {
    keyInput[key].removeClass('is-invalid');
    $(`#${key}Error`).text('');
}

// If number is power of 2, return 1, else return 0.
function isPowerOf2(number) {
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

function loadCacheTable(cacheMemory) {
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
                    </table>`);

    for (let i = 0; i < cacheMemory.length; i++) {
        let row = $(`<tr><th scope="row">${i}</th></tr>`);

        for (let j = 0; j < cacheMemory[0].cache.length; j++) {
            cacheMemory[i].cache[j] === undefined ? row.append(`<td></td>`) : row.append(`<td>${cacheMemory[i].cache[j]}</td>`);
        }
        table.append(row);
    }

    // Append table to <div> tableHolder
    $('#tableHolder').append(table);
}

function scrollToCacheResults() {
    var offset = $("#tableHolder").offset();
    offset.left -= 20;
    offset.top -= 20;
    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    });
}