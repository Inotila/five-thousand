//global variables that i want to be able to access in all functions
var playerScore = 0;
var cpuScore = 0;
var currentPoints = 0;
var zenCurrentPoints = 0;
var rollCounter = 0;
var keepClicked = false;
var addScore, player, cpu, d1, d2, d3, d4, d5, d6, zD1, zD2, zD3, zD4, zD5, zD6;

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

function clickCount() {
    rollCounter = rollCounter + 1;
    console.log(rollCounter);
}

function rollDi() {
    //roll the dice
    currentPoints = 0;

    let dices = ["one", "two", "three", "four", "five", "six"].map(
        (item, index) => {
            let randomNumber = Math.floor(Math.random() * 6) + 1;
            let elementId = `dice-${item}`;

            return {
                elementId: elementId,
                imgSrc: `dice${randomNumber}.png`,
                index: index + 1,
                number: randomNumber
            };
        });

    //calculating the points
    dices.map((dice, _index) => {
        let diceWithOnes = dices.filter((item, index) => item.number === 1);
        let diceWithFives = dices.filter((item, index) => item.number === 5);

        if (diceWithOnes.length >= 3 && index === 0) {
            currentPoints = currentPoints + 1000;
        } else if (diceWithFives.length >= 3 && index === 0) {
            currentPoints = currentPoints + 500;
        }

        if (dice.number === 1 && diceWithOnes.length < 3) {
            currentPoints = currentPoints + 100;
        } else if (dice.number === 5 && diceWithFives.length < 3) {
            currentPoints = currentPoints + 50;
        } else {
            currentPoints = currentPoints + 0;
        }
    });

    console.log("this is the players current score:" + currentPoints);

    function currentScore() {
        let score = parseInt(document.getElementById("current-score").innerHTML);
        document.getElementById("current-score").innerHTML = currentPoints;
        return score;
    }
    currentScore();

    //display the result
    dices.map((item, index) => {
        console.log("this is what you see: ", item.elementId, item.imgSrc);
        return (document.getElementById(
          item.elementId
        ).src = `./assets/images/${item.imgSrc}`);
      });

    player = true;
}

function keepDi() {
    playerScore = playerScore + currentPoints;
    console.log("this is the players score:" + playerScore);

    newScore();

    function newScore() {
        let updateScore = parseInt(document.getElementById("player-score").innerHTML);
        document.getElementById("player-score").innerHTML = playerScore;
        return updateScore;
    }

}

function endTurn() {
    alert("end of turn")
    player = false;

    if (player === false) {
        console.log("nmasters turn!")
    }

    masterTurn();

    function masterTurn() {
        if (player === false) {
            let zenDiceOne = Math.floor(Math.random() * 6) + 1;
            let zenDiceTwo = Math.floor(Math.random() * 6) + 1;
            let ZenDiceThree = Math.floor(Math.random() * 6) + 1;
            let ZenDiceFour = Math.floor(Math.random() * 6) + 1;
            let ZenDiceFive = Math.floor(Math.random() * 6) + 1;
            let ZenDiceSix = Math.floor(Math.random() * 6) + 1;

            zD1 = zenDiceOne;
            zD2 = zenDiceTwo;
            zD3 = ZenDiceThree;
            zD4 = ZenDiceFour;
            zD5 = ZenDiceFive;
            zD6 = ZenDiceSix;

            //calculating the points
            if (zenDiceOne === 1) {
                p1 = 100;
            } else if (zenDiceOne === 5) {
                p1 = 50;
            } else {
                p1 = 0;
            }

            if (zenDiceTwo === 1) {
                p2 = 100;
            } else if (zenDiceTwo === 5) {
                p2 = 50;
            } else {
                p2 = 0;
            }

            if (ZenDiceThree === 1) {
                p3 = 100;
            } else if (ZenDiceThree === 5) {
                p3 = 50;
            } else {
                p3 = 0;
            }

            if (ZenDiceFour === 1) {
                p4 = 100;
            } else if (ZenDiceFour === 5) {
                p4 = 50;
            } else {
                p4 = 0;
            }

            if (ZenDiceFive === 1) {
                p5 = 100;
            } else if (ZenDiceFive === 5) {
                p5 = 50;
            } else {
                p5 = 0;
            }

            if (ZenDiceSix === 1) {
                p6 = 100;
            } else if (ZenDiceSix === 5) {
                p6 = 50;
            } else {
                p6 = 0;
            }

            zenCurrentPoints = p1 + p2 + p3 + p4 + p5 + p6;

            console.log("this is the Zens current score:" + zenCurrentPoints);

            function zenPoints() {
                let ZenScore = parseInt(document.getElementById("current-score").innerHTML);
                document.getElementById("current-score").innerHTML = zenCurrentPoints;
                return ZenScore;
            }

            zenPoints();

            cpuScore = cpuScore + zenCurrentPoints;
            console.log("this is the zen score:" + cpuScore);

            newZenScore();

            function newZenScore() {
                let updateZenScore = parseInt(document.getElementById("cpu-score").innerHTML);
                document.getElementById("cpu-score").innerHTML = cpuScore;
                return updateZenScore;
            }

        }
    }
}

function score(params) {

}

function addScore(params) {

}

function subScore() {

}