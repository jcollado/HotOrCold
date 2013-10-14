$(document).ready(function() {
    var maxNumber = 100;
    var maxHeight = 423; // 25 + 400 - 8 (look at css)
    var maxTemp = null;
    var secretNumber = null;
    var oldTemp = null;

    // Bind to form submission instead of button click
    // to take advantage of pattern validation
    $("form").submit(handleSubmit);
    $("#new_game").click(initialize);

    function initialize() {
        secretNumber = getRandomInt(0, maxNumber);
        console.log("secretNumber: " + secretNumber);

        maxTemp = Math.max(Math.abs(100 - secretNumber),
                           secretNumber);
        console.log("maxTemp: " + maxTemp);
        oldTemp = 0;

        var mercury = $("#th-mercury .th-top");
        mercury.animate({height: tempToHeight(oldTemp)}, "fast");

        $("#submit").show();
        $("#feedback p").hide();
        $("#feedback_waiting").show();

        $("#guess").val("");

        return false;
    }

    // Returns a random integer between min and max
    // Using Math.round() will give you a non-uniform distribution!
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Transform temperature to height
    function tempToHeight(temp) {
        return temp * maxHeight / maxTemp;
    }

    // Get guess temperature
    function getGuessTemp() {
        var guess_value = $("#guess").val();
        console.log("guess: "  + guess_value);

        var temp = maxTemp - Math.abs(secretNumber - guess_value);
        console.log("temp: " + temp);

        return temp;
    }

    function handleSubmit() {
        var temp = getGuessTemp();

        // Textual feedback
        $("#feedback p").hide();
        if (temp == maxTemp) {
            $("#feedback_guessed").fadeIn().fadeOut().fadeIn();
            $("#submit").hide();
        }
        else if (temp > oldTemp) {
            $("#feedback_hotter").show();
        } else if (temp < oldTemp) {
            $("#feedback_colder").show();
        } else {
            $("#feedback_neither").show();
        }
        oldTemp = temp;

        var mercury = $("#th-mercury .th-top");
        mercury.animate({height: tempToHeight(temp)}, "fast");

        // Never really submit the form
        return false;
    }

    initialize();
});

