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
    for (let i = 0; i <6; i++){
       let roll = Math.floor(Math.random()*6)+1;
        console.log(roll);
    }

        //roll the dice
   let diceOne= Math.floor(Math.random() * 6) + 1;
   let diceTwo= Math.floor(Math.random() * 6) + 1;
   let diceThree= Math.floor(Math.random() * 6) + 1;
   let diceFour= Math.floor(Math.random() * 6) + 1;
   let diceFive= Math.floor(Math.random() * 6) + 1;
   let diceSix= Math.floor(Math.random() * 6) + 1;

   let diceRoll = [diceOne, diceTwo, diceThree, diceFour, diceFive,diceSix];
   console.log(diceRoll);

   //defining the
   for (let i = 0; i <  diceRoll.length; i++) {
    if (i === 1){
        points = 100;
    } else if (i === 5) {
        points = 50;
    } else {
        points = 0;
    }
    
    console.log(points);
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