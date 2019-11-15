//necessary for Materialize drop down menu
$(".dropdown-trigger").dropdown()
$('.collapsible').collapsible()
$('.materialboxed').materialbox()

let title = document.title

if (title === "Senate Members" || title === "House Members") {
    fillMainTables()
} else if (title === "Senate Attendance") {
    fillAtGlanceTable()
}

function fillMainTables() {

    // Selects Table Bodies
    const tableBody = document.querySelector("tbody");

    // Selects field members from Data files

    let members
    if (title === "Senate Members") {
        members = dataSenate.results[0].members;
    } else {
        members = dataHouse.results[0].members;
    }

    // Creates Tables and fills content
    members.forEach((member) => {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");

        // Creates Full-Name Field
        const firstName = member.first_name
        const middleName = member.middle_name
        const lastName = member.last_name

        let fullName
        if (middleName === null) {
            fullName = member.first_name + " " + member.last_name
        } else {
            fullName = member.firstName + " " + member.middleName + " " + member.lastName
        };

        // Creates data cells 
        td1.innerHTML = fullName
        td2.innerHTML = member.party
        td3.innerHTML = member.state
        td4.innerHTML = member.seniority
        td5.innerHTML = member.votes_with_party_pct

        // Appends cells
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        // Appends rows
        tableBody.appendChild(tr);
    })
}

function fillAtGlanceTable() {

    // Selects Table Bodies
    const tableBodyatGlance = document.querySelector("#At-Glance-Table > tbody")

    // Creates array with data
    let parties = [

        {
            name: "Democrats",
            noRep: houseStatistics.Democrats,
            pl: houseStatistics.plDemocrats
        },

        {
            name: "Republicans",
            noRep: houseStatistics.Republicans,
            pl: houseStatistics.plRepublicans
        },

        {
            name: "Independents",
            noRep: houseStatistics.Independents,
            pl: "null"
        },

        {
            name: "Totals",
            noRep: houseStatistics.Democrats + houseStatistics.Republicans + houseStatistics.Independents,
            pl: ((houseStatistics.plDemocrats + houseStatistics.plRepublicans)/2)        }

    ]

    // Creates Table elements and fills content
    parties.forEach((party) => {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");


        // Creates data cells
        td1.innerHTML = party.name
        td2.innerHTML = party.noRep
        td3.innerHTML = Math.round( party.pl * 1e2 ) / 1e2

        
        // // OPTION 2

        // let parties = ["Democrats", "Republicans", "Independents", "Totals"]


        // if (party === "Democrats") {
        //     td1.innerHTML = parties[0]
        //     td2.innerHTML = houseStatistics.Democrats
        //     td3.innerHTML = houseStatistics.plDemocrats
        // } else if (party === "Republicans") {
        //     td1.innerHTML = parties[1]
        //     td2.innerHTML = houseStatistics.Republicans
        //     td3.innerHTML = houseStatistics.plRepublicans
        // } else if (party === "Independents") {
        //     td1.innerHTML = parties[2]
        //     td2.innerHTML = houseStatistics.Independents
        //     td3.innerHTML = houseStatistics.plIndependents
        // } else if (party === "Totals") {
        //     td1.innerHTML = parties[3]
        //     td2.innerHTML = houseStatistics.Republicans + houseStatistics.Republicans + houseStatistics.Independents
        //     td3.innerHTML = houseStatistics.plRepublicans + houseStatistics.plRepublicans + houseStatistics.plIndependents
        // }

        // Appends cells
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Appends rows
        tableBodyatGlance.appendChild(tr);
    })
}