document.querySelector("#pickBtn").addEventListener("click", pickContestants);
document.querySelector("#raceBtn").addEventListener("click", startRace);
document.querySelector("#cancelBtn").addEventListener("click", returnToSelection);

const NUMRACERS = 5;

var names = [];
var pageTitles = ["Happy Racers!","Contestants","Race","Winner"];

function pickContestants () {
    names = [];
    let inputNames = document.querySelector("#inputNames").value;
    inputNames = inputNames.split("\n");
    inputNames = inputNames.filter(function (inputNames) {
        return inputNames.trim() !== "";
    })
    let numOfNames = inputNames.length;
    if (numOfNames < NUMRACERS){

    }
    else{
        let indexes = [];
        while(indexes.length < NUMRACERS){
            let index = Math.floor(Math.random() * numOfNames)
            if (!indexes.includes(index)){
                indexes.push(index);
            }
        }
        for(index of indexes){
            names.push(inputNames[index]);
        }
        updatePage2Names();
        changePage(1,2);
    }
}

function updatePage2Names () {
    let racerNames = document.querySelectorAll(".racerName");
    for(let i = 0; i < NUMRACERS; i++) {
        racerNames[i].innerHTML = names[i];
    }
}

function startRace() {
    changePage(2,3);
}

function returnToSelection() {
    changePage(2,1);
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