$(document).ready(function() {
    var secretNumber = getRandomInt(0, 100);
    console.log("secretNumber: " + secretNumber);

    $("form").submit(function() {
        var guess_value = $("#guess").val()
        console.log("guess: "  + guess_value);
        return false;
    });
});

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
