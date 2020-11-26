
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
  if(!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePressed(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

    //console.log(userClickedPattern);
  });

  function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("Success");

      if(userClickedPattern.length === gamePattern.length) {

        setTimeout(function () {
          nextSequence();
        }, 1000);
        }
      }else{
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Restart ");

        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 100);

        startOver();


    }


  }


function nextSequence () {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColurs = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColurs);

  $("#" + randomChoosenColurs).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColurs);
}

  function playSound(name) {

    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();

  }

  function animatePressed(currentColour) {
    $("#" + currentColour ).addClass("pressed");
    setTimeout(function() {
      $("#"+ currentColour).removeClass("pressed");
    }, 100);
  }

  function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
  }
