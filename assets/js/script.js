//global variables that i want to be able to access in all functions
var playerScore, cpuScore, currentScore, addScore, player, cpu;

//wait for the dom to finish loading
document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByClassName("play-buttons");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "play") {
                rollDi();
            } else if (this.getAttribute("data-type") === "keep") {
                keepDi();
            } else if (this.getAttribute("data-type") === "stop") {
                endTurn();
            } else {
                console.log("waiting for user to play");
            }
        });
    }
})

function rollDi() {
    //roll the dice
    let diceOne = Math.floor(Math.random() * 6) + 1;
    let diceTwo = Math.floor(Math.random() * 6) + 1;
    let diceThree = Math.floor(Math.random() * 6) + 1;
    let diceFour = Math.floor(Math.random() * 6) + 1;
    let diceFive = Math.floor(Math.random() * 6) + 1;
    let diceSix = Math.floor(Math.random() * 6) + 1;

    let diceRoll = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
    console.log(diceRoll);

    //calculating the points
    if (diceOne === 1) {
        p1 = 100;
    } else if (diceOne === 5) {
        p1 = 50;
    } else {
        p1 = 0;
    }

    if (diceTwo === 1) {
        p2 = 100;
    } else if (diceTwo === 5) {
        p2 = 50;
    } else {
        p2 = 0;
    }

    if (diceThree === 1) {
        p3 = 100;
    } else if (diceThree === 5) {
        p3 = 50;
    } else {
        p3 = 0;
    }

    if (diceFour === 1) {
        p4 = 100;
    } else if (diceFour === 5) {
        p4 = 50;
    } else {
        p4 = 0;
    }

    if (diceFive === 1) {
        p5 = 100;
    } else if (diceFive === 5) {
        p5 = 50;
    } else {
        p5 = 0;
    }

    if (diceSix === 1) {
        p6 = 100;
    } else if (diceSix === 5) {
        p6 = 50;
    } else {
        p6 = 0;
    }

    let totalPoints = p1 + p2 + p3 + p4 + p5 + p6;

    console.log(totalPoints);

    function currentScore(){
        let score =  parseInt(document.getElementById("current-score").innerText);
        document.getElementById("current-score").innerText = totalPoints;

        return score;
    }


    //display the result

    document.getElementById("dice-one").src = "./assets/images/dice" + diceOne + ".png";
    document.getElementById("dice-two").src = "./assets/images/dice" + diceTwo + ".png";
    document.getElementById("dice-three").src = "./assets/images/dice" + diceThree + ".png";
    document.getElementById("dice-four").src = "./assets/images/dice" + diceFour + ".png";
    document.getElementById("dice-five").src = "./assets/images/dice" + diceFive + ".png";
    document.getElementById("dice-six").src = "./assets/images/dice" + diceSix + ".png"

}

function keepDi() {
    alert("store these di")
}

function endTurn() {
    alert("end of turn")
}

function score(params) {

}

function addScore(params) {

}

function subScore() {

}

function masterTurn() {

}