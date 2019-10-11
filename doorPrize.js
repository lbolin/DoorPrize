document.querySelector("#pickBtn").addEventListener("click", pickContestants);
document.querySelector("#raceBtn").addEventListener("click", startRace);
document.querySelector("#cancelBtn").addEventListener("click", returnToSelection);

const NUMRACERS = 5;

var names = [];

function pickContestants () {
    let inputNames = document.querySelector("#inputNames").value;
    //console.log(names);
    inputNames = inputNames.split("\n");
    inputNames = inputNames.filter(function (inputNames) {
        return inputNames.trim() !== "";
    })
    let numOfNames = inputNames.length;
    if (numOfNames < NUMRACERS){
        alert("Please enter atleast 5 names") 
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
        document.querySelector("#Page1").classList.toggle("hidden");
        document.querySelector("#Page2").classList.toggle("hidden");
    }
}

function updatePage2Names () {
    let racerNames = document.querySelectorAll(".racerName");
    for(let i = 0; i < NUMRACERS; i++) {
        racerNames[i].innerHTML = names[i];
    }
}