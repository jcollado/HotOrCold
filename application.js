$(document).ready(function() {
    var secretNumber = getRandomInt(0, 100);
    console.log("secretNumber: " + secretNumber);

    var oldTemp = 0;

    $("form").submit(function() {
        var temp = getGuessTemp(secretNumber);

        // Textual feedback
        $("#feedback p").hide();
        if (temp == 100) {
            $("#guessed").show();
        }
        else if (temp > oldTemp) {
            $("#hotter").show();
        } else if (temp < oldTemp) {
            $("#colder").show();
        } else {
            $("#neither").show();
        }
        oldTemp = temp;

        var mercury = $("#th-mercury .th-top");
        mercury.animate({height: tempToHeight(temp)}, "fast");

        // Never really submit the form
        return false;
    });
});

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Transform temperature to height
function tempToHeight(temp) {
    var maxHeight = 423;
    var maxTemp = 100;
    return temp * maxHeight / maxTemp;
}

// Get guess temperature
function getGuessTemp(secretNumber) {
    var guess_value = $("#guess").val()
    console.log("guess: "  + guess_value);

    var temp = 100 - Math.abs(secretNumber - guess_value);
    console.log("temp: " + temp);

    return temp;
}
