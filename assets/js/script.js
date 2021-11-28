//global variables that i want to be able to access in all functions
var playerScore = 0;
var cpuScore = 0;
var currentPoints = 0;
var zenCurrentPoints = 0;
var rollCounter = 1;
var keepClicked = false;
var playerRolled = false;
var cpuRolled = false;
let audio = new Audio("./assets/sounds/dice-roll.wav");
let gameHasBegun = false;

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

//Disabling buttons that only will only be used once the user has started playing so they know what to press
startingOptions();

function startingOptions() {
    document.getElementById("stop-button").disabled = true;
    document.getElementById("keep-button").disabled = true;
    document.getElementById("roll-button").disabled = false;
    document.getElementById("stop-button").addEventListener("mouseover", function (event) {
        event.target.style.backgroundColor = "#fff";
    });
}

//counting the number of clicks to limit the number of turns a user gets
clickCount();

function clickCount() {
    if (playerRolled === true) {
        rollCounter = rollCounter + 1;
    }
    console.log("player rolled" + rollCounter + "times");

    //limting the number of times the user can play to 3 rolls
    rollNumberLimit();

    function rollNumberLimit() {
        if (rollCounter === 3) {
            document.getElementById("roll-button").disabled = true;
            document.getElementById("roll-button").style.backgroundColor = '#ff8080';
        }
    }
}


//sound effects for the dice
function play() {
    audio.play();
}

//main function for user, this is how the dice is rolled
function rollDi() {
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

    //calculating the points by filtering out the relavant numbers from the array
    dices.map((dice, _index) => {
        let diceWithOnes = dices.filter((item, index) => item.number === 1);
        let diceWithFives = dices.filter((item, index) => item.number === 5);
        let diceWithoutOnes = dices.filter((item, index) => item.number !== 1);
        let diceWithoutFives = dices.filter((item, index) => item.number !== 5);

        //calcultating how the point values of each number
        if (diceWithOnes.length >= 3 && _index === 0) {
            currentPoints = currentPoints + 1000;
            if (currentPoints >= 1000) {
                document.getElementById("points-indicator").style.backgroundColor = "#a0db16";
            }
        } else if (diceWithFives.length >= 3 && _index === 0) {
            currentPoints = currentPoints + 500;
            if (currentPoints >= 500) {
                document.getElementById("points-indicator").style.backgroundColor = "#a0db16";
            }
        } else if (diceWithoutOnes.length === 6 && _index === 0 && diceWithoutFives.length === 6 && _index === 0) {
            currentPoints = currentPoints + 0;
            document.getElementById("roll-button").disabled = true;
            document.getElementById("roll-button").style.backgroundColor = '#ff8080';
            document.getElementById("stop-button").disabled = false;
            document.getElementById("points-indicator").style.backgroundColor = "#ff8080"
        }

        if (dice.number === 1 && diceWithOnes.length < 3) {
            currentPoints = currentPoints + 100;
            document.getElementById("points-indicator").style.backgroundColor = "#fff";
        } else if (dice.number === 5 && diceWithFives.length < 3) {
            currentPoints = currentPoints + 50;
            document.getElementById("points-indicator").style.backgroundColor = "#fff";
        } else {
            currentPoints = currentPoints + 0;
            if (currentPoints === 0) {
                document.getElementById("points-indicator").style.backgroundColor = "#ff8080";
            }

        }
    });

    //adisplaying the score of the roll in current points
    function currentScore() {
        let score = parseInt(document.getElementById("current-score").innerHTML);
        document.getElementById("current-score").innerHTML = currentPoints;
        return score;
    }
    currentScore();

    //display the images of the dice that was rolled
    dices.map((item, index) => {
        return (document.getElementById(
            item.elementId
        ).src = `./assets/images/${item.imgSrc}`);
    });

    gameHasBegun = true;
    playerRolled = true;

    //enabling the keep button after the first roll
    if (playerRolled === true) {
        document.getElementById("keep-button").disabled = false;
    }
}

//this adds the currents points that the users wants to keep on to their total score
function keepDi() {
    keepClicked = true;
    rollCounter = 1;
    playerScore = playerScore + currentPoints;

    newScore();
    //updates the players total score after every turn
    function newScore() {
        let updateScore = parseInt(document.getElementById("player-score").innerHTML);
        document.getElementById("player-score").innerHTML = playerScore;
        return updateScore;
    }

    //locking the buttons the player uses to play to end their turn, and help them know to let the PC play
    if (keepClicked === true) {
        document.getElementById("keep-button").disabled = true;
        document.getElementById("keep-button").style.backgroundColor = '#ff8080';
        document.getElementById("roll-button").disabled = true;
        document.getElementById("roll-button").style.backgroundColor = '#ff8080';
        document.getElementById("stop-button").disabled = false;

    }

    //this determines if the player won and pops up a message to alert them
    if (playerScore >= 5000) {
        gameHasBegun = false;
        console.log("Player wins");
        document.getElementById("winner-pop-up").style.visibility = 'visible';
        document.getElementById("winner-text").innerHTML = 'You have won,well done! The student becomes the master. If you would like try again select play, or select home to return home.';
        document.getElementById("keep-button").disabled = true;
        document.getElementById("keep-button").style.backgroundColor = '#ff8080';
        document.getElementById("roll-button").disabled = true;
        document.getElementById("roll-button").style.backgroundColor = '#ff8080';
        document.getElementById("stop-button").disabled = true;
        document.getElementById("stop-button").style.backgroundColor = '#ff8080';
    }

    zenTurnIndicator();
    //a function that triggers a popup to show that their turn has ended
    function zenTurnIndicator() {
        if (keepClicked === true && gameHasBegun === true) {
            setTimeout(function endTurnIndicatordelay() {
                document.getElementById("turn-indicator").style.visibility = 'visible';
                document.getElementById("turn-text").innerHTML = masterTurnSpeach();
            }, 1200);


            setTimeout(function closeTurnIndicator() {
                document.getElementById("turn-indicator").style.visibility = 'hidden'
            }, 2400);

            //generates random speach for the message in the turn indicator
            function masterTurnSpeach() {
                var randomSpeach = ["IT IS MY TURN!", "LET THE MASTER PLAY", "MY GO!", "PASS THE DICE", "WATCH AND LEARN", "MY THROW", "I'M READY!"];
                var randomSpeachIndex = Math.floor(Math.random() * randomSpeach.length);
                var speach = randomSpeach[randomSpeachIndex];
                return speach;
            }


        }
    }
}


function endTurn() {
    playerRolled = false;

    masterTurn();

    //cpu logic so that it too gets 3 rolls and rolls again if it gets a score less than 150 to make it compete
    let i = 0;
    while (i > 3 && zenCurrentPoints >= 150) {
        masterTurn() + i;
        i++;
    }

    function masterTurn() {
        if (playerRolled === false) {
            zenCurrentPoints = 0;

            let zenDices = ["one", "two", "three", "four", "five", "six"].map(
                (item, index) => {
                    let zenRandomNumber = Math.floor(Math.random() * 6) + 1;
                    let zenElementId = `dice-${item}`;

                    return {
                        zenElementId: zenElementId,
                        imgSrc: `zendice${ zenRandomNumber}.png`,
                        index: index + 1,
                        number: zenRandomNumber
                    };
                });

            //calculating the points
            zenDices.map((dice, _index) => {
                let zenDiceWithOnes = zenDices.filter((item, index) => item.number === 1);
                let zenDiceWithFives = zenDices.filter((item, index) => item.number === 5);
                let zenDiceWithoutOnes = zenDices.filter((item, index) => item.number !== 1);
                let zenDiceWithoutFives = zenDices.filter((item, index) => item.number !== 5);

                if (zenDiceWithOnes.length >= 3 && _index === 0) {
                    zenCurrentPoints = zenCurrentPoints + 1000;
                    document.getElementById("points-indicator").style.backgroundColor = "#a0db16";
                } else if (zenDiceWithFives.length >= 3 && _index === 0) {
                    zenCurrentPoints = zenCurrentPoints + 500;
                    document.getElementById("points-indicator").style.backgroundColor = "#a0db16";
                } else if (zenDiceWithoutOnes.length === 6 && _index === 0 && zenDiceWithoutFives.length === 6 && _index === 0) {
                    zenCurrentPoints = zenCurrentPoints + 0;
                    zenRandomNumber = 0;
                    console.log("end zen turn!")
                    document.getElementById("points-indicator").style.backgroundColor = "#ff8080";
                }


                if (dice.number === 1 && zenDiceWithOnes.length < 3) {
                    zenCurrentPoints = zenCurrentPoints + 100;
                    document.getElementById("points-indicator").style.backgroundColor = "#fff"
                } else if (dice.number === 5 && zenDiceWithFives.length < 3) {
                    zenCurrentPoints = zenCurrentPoints + 50;
                    document.getElementById("points-indicator").style.backgroundColor = "#fff"
                } else {
                    zenCurrentPoints = zenCurrentPoints + 0;
                    if (zenCurrentPoints === 0) {
                        document.getElementById("points-indicator").style.backgroundColor = "#ff8080";
                    }
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
                return (document.getElementById(
                    item.zenElementId
                ).src = `./assets/images/${item.imgSrc}`);
            });
        }
        rollCounter = 0;
        playerRolled = true;

        if (playerRolled === true) {
            document.getElementById("roll-button").disabled = false;
            document.getElementById("roll-button").style.backgroundColor = '#fff';
            document.getElementById("roll-button").addEventListener("mouseover", function (event) {
                event.target.style.backgroundColor = "#a0db16";
            });
            document.getElementById("keep-button").disabled = true;
            document.getElementById("keep-button").style.backgroundColor = '#fff';
            document.getElementById("stop-button").disabled = true;
        }

    }

    //get winner
    if (cpuScore >= 5000) {
        gameHasBegun = false;
        console.log("Mazer Zen wins");
        document.getElementById("winner-pop-up").style.visibility = 'visible';
        document.getElementById("winner-text").innerHTML = 'I have defeated you, but you did well. If you would like try again select play, or select home to return home.';
        document.getElementById("keep-button").disabled = true;
        document.getElementById("keep-button").style.backgroundColor = '#ff8080';
        document.getElementById("roll-button").disabled = true;
        document.getElementById("roll-button").style.backgroundColor = '#ff8080';
        document.getElementById("stop-button").disabled = true;
        document.getElementById("stop-button").style.backgroundColor = '#ff8080';
    }

    turnIndicator();

    function turnIndicator() {
        if (playerRolled === true && gameHasBegun === true) {
            setTimeout(function endOfMasterRoll() {
                document.getElementById("turn-indicator").style.visibility = 'visible'
            }, 1200);
            document.getElementById("turn-text").innerHTML = TurnSpeach();

            setTimeout(function closeTurnIndicator() {
                document.getElementById("turn-indicator").style.visibility = 'hidden'
            }, 2400);

            function TurnSpeach() {
                var randomSpeach = ["IT IS YOUR TURN!", "YOUR THROW", "YOU!", "YOU ARE UP", "THE DICE IS YOURS", "TRY YOUR LUCK", "BEST OF LUCK"];

                var speachIndex = Math.floor(Math.random() * randomSpeach.length);

                var speachTwo = randomSpeach[speachIndex];

                return speachTwo;
            }
        }
    }


}