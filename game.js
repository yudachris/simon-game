var titleText = $("#level-title");

var buttonColours = ["red", "blue", "green", "yellow"];

var colourPattern = [];

var indexCounter = 0;

var gameOver = true;

var clickCounter = 1;

$("html").on("keydown", function (e) {

    if (gameOver) {
        gameOver = false;
        nextSequence();
    } else {
        //do nothing
    }

});

$("html").on("click", function (e) {

    clickCounter++;
    
    if (gameOver ==  true && clickCounter == 2) {
        gameOver = false;
        nextSequence();
    } else {
        //do nothing
    }

});


$(".btn").click(function () {

    var playerChosenColour = this.id;

    buttonPressAnimation(playerChosenColour);
    playSound(playerChosenColour);
    checkPattern(playerChosenColour, indexCounter);
});

function checkPattern(color, index) {

    var x = color;
    var y = colourPattern[index];
    var arrayLastIndex = colourPattern.length - 1;        

    if(x === y && index === arrayLastIndex){
        /*if correct and the array is on the last element (meaning the player can guess all of the sequence), 
        adding a new color to the array and return the index counter to 0 so player need to guess the sequence from the start again. */
        //also adding delay so the user can have some time readying themself to see the next sequence.
        
        setTimeout(function(){
            nextSequence();
        }, 1000);
        indexCounter = 0;
    }
    else if(x === y){
        //if correct, increase counter so the player can guess the next color of the array element.
        indexCounter++;
    }
    else {
        titleText.text("Game Over! Press Any Key or Click to Restart");
        gameOver = true;
        clickCounter = 0;
        indexCounter = 0;
        colourPattern = [];
        gameOverAnimation();
        playSound("wrong");
    }

}

function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    colourPattern.push(randomChosenColour);

    //change level text to the next level
    titleText.text("Level " + colourPattern.length);
    //animate button to show player which button to press next
    nextSequenceAnimation(randomChosenColour);

}


function buttonPressAnimation(buttonColour) {
    $("#" + buttonColour).addClass("pressed");
    setTimeout(function () {
        $("#" + buttonColour).removeClass("pressed");
    }, 100);
}

function nextSequenceAnimation(randomChosenColour) {
    $("#" + randomChosenColour).animate({
        opacity: 0.3
    }, 100);
    setTimeout(function () {
        $("#" + randomChosenColour).animate({
            opacity: 1
        }, 100);
    }, 350);
}

function gameOverAnimation() {

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 50);

}

function playSound(buttonColour) {

    var filePath = "sounds/" + buttonColour + ".mp3"
    var audio = new Audio(filePath);
    audio.play();

}