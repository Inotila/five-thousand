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