document.querySelector("#pickBtn").addEventListener("click", pickContestants);
document.querySelector("#raceBtn").addEventListener("click", startRace);
document.querySelector("#cancelBtn").addEventListener("click", returnToSelection);
document.querySelector("#restartBtn").addEventListener("click", restartRace);
document.querySelector("#newRaceBtn").addEventListener("click", newRace);

const NUMRACERS = 5;

var names = [];
var pageTitles = ["Happy Racers!", "Contestants", "Race", "Winner"];
var intervalRace;

function pickContestants() {
    names = [];
    let inputNames = document.querySelector("#inputNames").value;
    inputNames = inputNames.split("\n");
    inputNames = inputNames.filter(function (inputNames) {
        return inputNames.trim() !== "";
    })
    let numOfNames = inputNames.length;
    if (numOfNames < NUMRACERS) {

    }
    else {
        let indexes = [];
        while (indexes.length < NUMRACERS) {
            let index = Math.floor(Math.random() * numOfNames)
            if (!indexes.includes(index)) {
                indexes.push(index);
            }
        }
        for (index of indexes) {
            names.push(inputNames[index]);
        }
        updatePage2Names();
        changePage(1, 2);
    }
}

function updatePage2Names() {
    let racerNames = document.querySelectorAll(".racerName");
    for (let i = 0; i < NUMRACERS; i++) {
        racerNames[i].innerHTML = names[i];
    }
}

function startRace() {
    changePage(2, 3);
    let startSound = document.querySelector("#startSound");
    startSound.play();
    setTimeout(race ,4000)
}

function returnToSelection() {
    changePage(2, 1);
}

function changePage(from, to) {
    if (from >= 1 && from <= 4 && to >= 1 && to <= 4) {
        document.querySelector("#Page" + from).classList.toggle("hidden");
        document.querySelector("#Page" + to).classList.toggle("hidden");
        document.querySelector("#PageTitle").innerHTML = pageTitles[to - 1];
    }
    else {
        console.error("Invalid argument for changePage");
    }
}

function race() {
    intervalRace = setInterval(moveRacers ,20)
}

function moveRacers() {
    var winWidth = document.querySelector("#Page3 .racer").offsetWidth;
    //console.log(winWidth);
    var racers = document.querySelectorAll("#Page3 .racerImg");
    let racerWon = false;
    for (racer of racers) {
        let moveWidth = Math.floor(Math.random() * 5);
        let position = racer.style.left;
        position = parseInt(position);
        position += moveWidth;
        if (position >= winWidth-50){
            position = winWidth -50;
            racerWon = true;
        }
        racer.style.left = position + "px";
    }
    if (racerWon){
        clearInterval(intervalRace);
        let winners = [];
        let indexOfWinner = 0;
        for (let i = 0; i < racers.length; i++) {
            let racer = racers[i];
            let finalPosition = racer.style.left;
            finalPosition = parseInt(finalPosition);
            if(finalPosition === winWidth - 50) {
                winners.push(racer);
                indexOfWinner = i;
            }
        }
        if (winners.length === 0){
            alert("Sorry an error occured, please reload the webpage");
        }
        else if (winners.length > 1){
            alert("There was a tie!");
            document.querySelector("#restartBtn").classList.remove("hidden");
        }
        else {
            setTimeout(function () {
                showWinner(indexOfWinner);
            },2000)
        }
    }
}

function resetRacePositions() {
    document.querySelector("#restartBtn").classList.add("hidden");
    let racers = document.querySelectorAll("#Page3 .racerImg");
    for (racer of racers) {
        racer.style.left = "0px";
    }
}

function restartRace() {
    resetRacePositions();
    race();
}

function showWinner(winnerIndex) {
    let winnerImg = document.querySelector("#winnerImg");
    let winnerMsg = document.querySelector("#winnerMessage");
    winnerImg.src = "img" + (winnerIndex + 1) + ".jpeg";
    winnerMsg.innerHTML = "Congrats " + names[winnerIndex] + "!";
    changePage(3,4);
}

function newRace () {
    resetRacePositions();
    changePage(4,1);
}