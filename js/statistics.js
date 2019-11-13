let houseStatistics = {
    Democrats: 0,
    Republicans: 0,
    Independents: 0,
    plDemocrats: 0,
    plRepublicans: 0,
    mostEngaged: "{null}",
    leastEngaged: "null",
    mostMissers: "null",
    leastMissers: "null"
};

let members
if (document.title === "Senate Members") {
    members = dataSenate.results[0].members;
} else {
    members = dataHouse.results[0].members;
}

function addMembers(mem) {
    if (mem.party === "D") {
        houseStatistics.Democrats++
    } else if (mem.party === "R") {
        houseStatistics.Republicans++
    } else if (mem.party === "I") {
        houseStatistics.Independents++
    }
};


function runStats() {

    let total = 0

    members.forEach((member) => {
        addMembers(member)

        total = total + member.votes_with_party_pct

    })

    var average = total / members.length

    houseStatistics.plDemocrats = average
}


console.log("satistics", houseStatistics);

runStats()