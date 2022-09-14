var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;


function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level = level+1;
  $("h1").text("Level " + level);
};

// User clicking
$(".btn").click(function() {

  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// Playing sound function

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Button animation of press

function animatePress (currentColour){

  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
  }, 100);
}

//When keyboard key first time pressed

$(document).one("keydown", function(){
  nextSequence();
  $("h1").text("Level 1");
});
//

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      } , 1000);
    }

  } else {
   var wrongAudio = new Audio("sounds/wrong.mp3");
   wrongAudio.play();
   $("body").addClass("game-over");
   setTimeout(function(){
   $("body").removeClass("game-over");
 }, 200);
   $("h1").text("Game Over, Press Any Key to Restart");
   startOver();
  }
};

function startOver(){
  level = 0;
  gamePattern = [];
  $(document).one("keydown", function(){
    nextSequence();
    $("h1").text("Level 1");
  });
}
