
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let score = 0;
let highScore = localStorage.getItem("highScore");


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text(`Score: ${score} HighScore: ${0}`);
    nextSequence();
    started = true;
  }
});


function checkHighScore(){
  if(!localStorage.getItem("highScore")){
    localStorage.setItem("highScore", score);
    
    $("#level-title").text(`Score: ${score} HighScore: ${0}`);
  }
  else if (highScore < score){
    highScore = score;
    localStorage.setItem("highScore", highScore);
    $("#level-title").text(`Score: ${score} HighScore: ${score}`);
   }
}

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
 $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      checkHighScore();
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  score++;
  if(highScore == null){
    $("#level-title").text(`Score: ${score} HighScore: ${0}`);
  }
  else{
    $("#level-title").text(`Score: ${score} HighScore: ${highScore}`);
  }

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver() {

 
  score = 0;
  gamePattern = [];
  started = false;
}
