document.querySelector("#pickBtn").addEventListener("click", pickContestants);

const NUMRACERS = 5;

var names = [];

console.log()

function pickContestants () {
    let inputNames = document.querySelector("#inputNames").value;
    //console.log(names);
    inputNames = inputNames.split("\n");
    inputNames = inputNames.filter(function (inputNames) {
        return inputNames.trim() !== "";
    })

    let numOfNames = inputNames.length;

    if (numOfNames < NUMRACERS){
        alert("Please enter at least 5 names")
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

    // for (name of names){
    //     console.log(name);
    // }

}

function updatePage2Names () {
    
}