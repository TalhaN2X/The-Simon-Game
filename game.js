//alert("Hello Simon");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startedToToggle = false;

$("body").keypress(function(event) {
    if(startedToToggle === false) {
        $("h1#level-title").text("Level " + level);
        nextSequence();
        startedToToggle = true;
    }
});

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name) {
    if(name != "wrong") {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
    } else {
        var wrongsound =new Audio("sounds/wrong.mp3");
        wrongsound.play();
    }

}

function animatePress(currentColour) {
    $("#"+ currentColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("."+ currentColour).addClass("pressed");
    var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
        //your code to be executed after 1 second
        $("."+currentColour).removeClass("pressed");
    }, delayInMilliseconds);

}
//nextSequence();

function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
            
            //5. Call nextSequence() after a 1000 millisecond delay.
            var delayInMilliseconds = 1000; //10 second
            setTimeout(function() {
                nextSequence();  
            }, delayInMilliseconds);
        }
    } else {
        console.log("wrong");
        startOver();
    }
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
}

function startOver() {
    $("body").addClass("game-over");
        $("h1#level-title").text("Game Over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("h1#level-title").text("Press Any Key to Start");
        }, 200);
    level = 0;
    gamePattern = [];
}