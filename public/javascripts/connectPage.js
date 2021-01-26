$(document).ready(function() {
    $('#startButton').on('click', function(){
        let picked = $('input[name="choiceRadio"]:checked').val();

        console.log(picked);

        if (picked === "simpleton")
            window.location.href = '/simpleton';
        else if (picked === "sequential")
            window.location.href = '/sequential';
    });

    $('#howItWorksButton').on('click', function () {
        window.location.href = '/userGuide';
      })
});