//global variables that i want to be able to access in all functions
var playerScore = 0;
var cpuScore = 0;
var currentPoints = 0;
var zenCurrentPoints = 0;
var rollCounter = 1;
var keepClicked = false;
var playerRolled = false;
var addScore, cpu, d1, d2, d3, d4, d5, d6, zD1, zD2, zD3, zD4, zD5, zD6;

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

clickCount();

function clickCount() {
    if (playerRolled === true) {
        rollCounter = rollCounter + 1;
    }
    console.log("player rolled" + rollCounter + "times");

    rollNumberLimit();

    function rollNumberLimit() {
        if (rollCounter === 3) {
            document.getElementById("roll-button").disabled = true;
        }
    }
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

        if (diceWithOnes.length >= 3 && _index === 0) {
            currentPoints = currentPoints + 1000;
        } else if (diceWithFives.length >= 3 && _index === 0) {
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

    playerRolled = true;
}

function keepDi() {
    keepClicked = true;
    rollCounter = 1;
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
    playerRolled = false;

    masterTurn();

    function masterTurn() {
        if (playerRolled === false) {
            zenCurrentPoints = 0;

            let zenDices = ["one", "two", "three", "four", "five", "six"].map(
                (item, index) => {
                    let zenRandomNumber = Math.floor(Math.random() * 6) + 1;
                    let zenElementId = `dice-${item}`;

                    return {
                        zenElementId: zenElementId,
                        imgSrc: `dice${ zenRandomNumber}.png`,
                        index: index + 1,
                        number: zenRandomNumber
                    };
                });


            //calculating the points
            zenDices.map((dice, _index) => {
                let zenDiceWithOnes = zenDices.filter((item, index) => item.number === 1);
                let diceWithFives = zenDices.filter((item, index) => item.number === 5);

                if (zenDiceWithOnes.length >= 3 && _index === 0) {
                    zenCurrentPoints = zenCurrentPoints + 1000;
                } else if (diceWithFives.length >= 3 && _index === 0) {
                    zenCurrentPoints = zenCurrentPoints + 500;
                }

                if ( dice.number === 1 && zenDiceWithOnes.length < 3) {
                    zenCurrentPoints =  zenCurrentPoints + 100;
                } else if (dice.number === 5 && diceWithFives.length < 3) {
                    zenCurrentPoints = zenCurrentPoints + 50;
                } else {
                    zenCurrentPoints = zenCurrentPoints + 0;
                }
            });


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

            //display the result
            zenDices.map((item, index) => {
                console.log("this is what you see: ", item.zenElementId, item.imgSrc);
                return (document.getElementById(
                    item.zenElementId
                ).src = `./assets/images/${item.imgSrc}`);
            });
        }

        playerRolled = true;
        console.log(playerRolled);

    }
}