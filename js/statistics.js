// CREATES  new array for each party

let demArray = []
let repArray = []
let indArray = []

function createPartyArrays(mem) {

    if (mem.party === "D") {
        demArray.push(mem)
    } else if (mem.party === "R") {
        repArray.push(mem)
    } else if (mem.party === "I") {
        indArray.push(mem)
    }
}


// PARTY LOYALTY calculations

let plWithDem = 0
let plWithRep = 0
let plAgainstDem = 0
let plAgainstRep = 0

function getAverages() {

    demArray.forEach((member) => {
        plWithDem += member.votes_with_party_pct;
        plAgainstDem += member.votes_against_party_pct;

    })

    repArray.forEach((member) => {
        plWithRep += member.votes_with_party_pct;
        plAgainstRep += member.votes_against_party_pct;
    })
}

// ENGAGEMENT calculations


// RUNS ALL FUNCTIONS

function runStats() {

    // let members
    // if (title === "Senate Members" || "Senate Attendance" || "Senate Loyalty") {
    //     members = dataSenate.results[0].members;
    // } else {
    //     members = dataHouse.results[0].members;
    // }

    members.forEach((member) => {
        createPartyArrays(member)

    })
}

//createMembersArrays()
runStats()
getAverages()


// OBJECT statistics
let statistics = {

    Democrats: demArray.length,
    Republicans: repArray.length,
    Independents: indArray.length,
    plDemocrats: (plWithDem / demArray.length),
    plRepublicans: (plWithRep / repArray.length),
    pDisDem: (plAgainstDem / demArray.length),
    pDisRep: (plAgainstRep / demArray.length),
    mostEngaged: "null",
    leastEngaged: "null",
};