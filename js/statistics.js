// Creates variable members according to page title

let members
if (document.title === "Senate Members") {
    members = dataSenate.results[0].members;
} else {
    members = dataHouse.results[0].members;
}

// CREATES one new array for each party

let demArray = []
let repArray = []
let indArray = []

function createMemberArrays(mem) {

    if (mem.party === "D") {
        demArray.push(mem)
    } else if (mem.party === "R") {
        repArray.push(mem)
    } else if (mem.party === "I") {
        indArray.push(mem)
    }
}

// // passes number of members directly into the housestatistics object // WORKS
// function splitMembers(mem) {
//     if (mem.party === "D") {
//         houseStatistics.Democrats++
//     } else if (mem.party === "R") {
//         houseStatistics.Republicans++
//     } else if (mem.party === "I") {
//         houseStatistics.Independents++
//     }
// };

// PARTY LOYALTY calculations

let plDem = 0
let plRep = 0

function getAverages() {

    demArray.forEach((member) => {
        plDem += member.votes_with_party_pct;
    })
    
    repArray.forEach((member) => {
        plRep  += member.votes_with_party_pct;
    })
}


function runStats() {

    members.forEach((member) => {
        createMemberArrays(member)
    })
}

runStats()
getAverages()


// OBJECT statistics

let houseStatistics = {

    Democrats: demArray.length,
    Republicans: repArray.length,
    Independents: indArray.length,
    plDemocrats: (plDem / demArray.length),
    plRepublicans: (plRep / repArray.length),
    mostEngaged: "{null}",
    leastEngaged: "null",
    mostMissers: "null",
    leastMissers: "null"
};

console.log("satistics", houseStatistics);