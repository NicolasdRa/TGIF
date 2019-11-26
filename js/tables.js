// RUNS ALL STATISTICS / GLobal
function runStats(members) {

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

    // PARTY LOYALTY calculations / Global
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
    getAverages()


    // runs all stats
    members.forEach((member) => {
        createPartyArrays(member)
    })


    // Statistics OBJECT
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

    console.log(statistics)

    statistics.Democrats = demArray.length
    statistics.Republicans = repArray.length
    statistics.Independents = indArray.length
}

function runCheckboxFilter() {
    // Filter by Party Function (checkboxes)

    // Event listener
    var checkBoxSelection = document.querySelector('.checkboxes')
    checkBoxSelection.addEventListener('change', fillMainTable)

    // Returns array of Values from Checked Checkboxes
    function checkBoxesValues() {
        var array = []
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        return array
    }

    // Filter Variables Checkbox / Dropdown
    const tableBody = document.querySelector("tbody");
    var checkBoxes = checkBoxesValues()
    var ddmenu = getSelectedText()

}


// Filter by State
function runDdFilter(members) {

    // Creates array of States
    var states = []
    members.forEach((state) => {
        states.push(state.state)
    });

    // Removes duplicates
    states = states.filter(function (state, index) {
        return states.indexOf(state) === index;
    })

    // Sorts array
    states.sort()

    // Adds "All options"
    states.splice(0, 0, 'ALL STATES');

    // Fills OPTIONS with State Names
    const ddmenu = document.querySelector('.browser-default');

    states.forEach((i) => {
        var option = document.createElement("option");

        // Fills cell Data 
        option.innerHTML = [i]

        // Appends cells
        ddmenu.appendChild(option);
    })

    // Event Listener
    ddmenu.addEventListener('change', fillMainTable);

    //Gets selected text from Dropdown Menu options
    function getSelectedText() {
        const ddmenu = document.querySelector('.browser-default');
        return ddmenu.options[ddmenu.selectedIndex].text;
    }
    getSelectedText()
}


// FILLS MAIN TABLES WITH MEMBERS
function fillMainTable(members) {

    // Clears Tables before printing members
    tableBody.innerHTML = ""

    // Creates Tables and fills content   
    members.forEach((member) => {

        // Checks if Party Name is included in the array before creating element
        if ((ddmenu === 'ALL STATES' || ddmenu === 'Choose State') && (checkBoxes.includes(member.party))) {
            insertMembers()
        } else if (checkBoxes.includes(member.party) && (ddmenu === (member.state))) {
            insertMembers()
        }

        function insertMembers() {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");

            // Creates Full-Name Field
            var firstName = member.first_name
            var middleName = member.middle_name
            var lastName = member.last_name

            var fullName
            if (middleName === null) {
                fullName = firstName + " " + lastName
            } else {
                fullName = firstName + " " + middleName + " " + lastName
            };

            // Creates Link
            var a = document.createElement('a');
            a.href = member.url;

            // Creates data cells 
            a.innerHTML = fullName
            td1.appendChild(a)
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
        }
    })
}

// FILLS AT A GLANCE TABLES

function fillaAtGlanceTable() {
    // Selects Table Bodies
    const tableBodyatGlance = document.querySelector("#At_a_Glance")

    // Creates array with Party Data for At a Glance Tables
    let parties = [{
            name: "Democrats",
            noRep: statistics.Democrats,
            pl: statistics.plDemocrats
        },

        {
            name: "Republicans",
            noRep: statistics.Republicans,
            pl: statistics.plRepublicans
        },

        {
            name: "Independents",
            noRep: statistics.Independents,
            pl: "null"
        },

        {
            name: "Totals",
            noRep: statistics.Democrats + statistics.Republicans + statistics.Independents,
            pl: ((statistics.plDemocrats + statistics.plRepublicans) / 2)
        }
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
        td3.innerHTML = Math.round(party.pl * 1e2) / 1e2

        // Appends cells
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Appends rows
        tableBodyatGlance.appendChild(tr);
    })
}


function fillLeastEngagedTable(members) {

    var sortedMembers = members.slice();
    sortedMembers.sort((a, b) => {
        return b.missed_votes_pct - a.missed_votes_pct;
    });


    // CREATES FIRST 10% 

    var cutLength = Math.round((members.length) * 0.1)
    var splicedMembers = sortedMembers.splice(0, cutLength)
    var lastMember10prc = splicedMembers[splicedMembers.length - 1]

    // ADDS DUPPLICATES
    sortedMembers.forEach((member) => {
        if (member.missed_votes_pct === lastMember10prc.missed_votes_pct) {
            if (lastMember10prc != member)
                splicedMembers.push(member)
        }
    })


    // FILL TABLES
    const tableLeast = document.querySelector('#Least-Engaged');

    splicedMembers.forEach((member) => {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");


        // Creates Full-Name Field
        var firstName = member.first_name
        var middleName = member.middle_name
        var lastName = member.last_name

        var fullName
        if (middleName === null) {
            fullName = firstName + " " + lastName
        } else {
            fullName = firstName + " " + middleName + " " + lastName
        };

        // Creates Link
        var a = document.createElement('a');
        a.href = member.url;

        // Creates data cells 
        a.innerHTML = fullName
        td1.appendChild(a)

        td2.innerHTML = member.missed_votes
        td3.innerHTML = member.missed_votes_pct

        // Appends cells
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Appends rows
        tableLeast.appendChild(tr);
    })
}

function fillMostEngagedTable(members) {

    var sortedMembersMost = members.slice();
    sortedMembersMost.sort((a, b) => {
        return a.missed_votes_pct - b.missed_votes_pct;
    });

    // CREATES FIRST 10% 

    var cutLength = Math.round((members.length) * 0.1)
    var splicedMembersMost = sortedMembersMost.splice(0, cutLength)
    var lastMember10prc = splicedMembersMost[splicedMembersMost.length - 1]

    // ADDS DUPPLICATES
    sortedMembersMost.forEach((member) => {
        if (member.missed_votes_pct === lastMember10prc.missed_votes_pct) {
            if (lastMember10prc != member)
                splicedMembersMost.push(member)
        }
    })


    // FILL TABLES
    const tableMost = document.querySelector('#Most-Engaged');

    splicedMembersMost.forEach((member) => {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");


        // Creates Full-Name Field
        var firstName = member.first_name
        var middleName = member.middle_name
        var lastName = member.last_name

        var fullName
        if (middleName === null) {
            fullName = firstName + " " + lastName
        } else {
            fullName = firstName + " " + middleName + " " + lastName
        };

        // Creates Link
        var a = document.createElement('a');
        a.href = member.url;


        // Creates data cells 
        a.innerHTML = fullName
        td1.appendChild(a)

        td2.innerHTML = member.missed_votes
        td3.innerHTML = member.missed_votes_pct

        // Appends cells
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Appends rows
        tableMost.appendChild(tr);
    })
}

function fillLeastLoyalTable(members) {

    var sortedMembers = members.slice();
    sortedMembers.sort((a, b) => {
        return b.votes_against_party_pct - a.votes_against_party_pct;
    });


    // CREATES FIRST 10% 

    var cutLength = Math.round((members.length) * 0.1)
    var splicedMembers = sortedMembers.splice(0, cutLength)
    var lastMember10prc = splicedMembers[splicedMembers.length - 1]



    // ADDS DUPPLICATES

    sortedMembers.forEach((member) => {
        if (member.votes_against_party_pct === lastMember10prc.votes_against_party_pct) {
            splicedMembers.push(member)
            if (lastMember10prc != member)
                splicedMembers.push(member)
        }
    })


    // FILL TABLES

    const tableLeast = document.querySelector('#Least-Loyal');

    splicedMembers.forEach((member) => {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");


        // Creates Full-Name Field
        var firstName = member.first_name
        var middleName = member.middle_name
        var lastName = member.last_name

        var fullName
        if (middleName === null) {
            fullName = firstName + " " + lastName
        } else {
            fullName = firstName + " " + middleName + " " + lastName
        };

        // Creates Link
        var a = document.createElement('a');
        a.href = member.url;

        // Creates data cells 
        a.innerHTML = fullName
        td1.appendChild(a)

        td2.innerHTML = member.total_votes
        td3.innerHTML = member.votes_with_party_pct

        // Appends cells
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Appends rows
        tableLeast.appendChild(tr);
    })
}

function fillMostLoyalTable(members) {

    var sortedMembersMost = members.slice();
    sortedMembersMost.sort((a, b) => {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });


    // CREATES FIRST 10% 
    var cutLength = Math.round((members.length) * 0.1)
    var splicedMembersMost = sortedMembersMost.splice(0, cutLength)
    var lastMember10prc = splicedMembersMost[splicedMembersMost.length - 1]


    // ADDS DUPPLICATES
    sortedMembersMost.forEach((member) => {
        if (member.votes_with_party_pct === lastMember10prc.votes_with_party_pct) {
            splicedMembersMost.push(member)
            if (lastMember10prc != member)
                splicedMembersMost.push(member)
        }
    })


    // FILL TABLES
    const tableMost = document.querySelector('#Most-Loyal');

    splicedMembersMost.forEach((member) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");

        // Creates Full-Name Field
        var firstName = member.first_name
        var middleName = member.middle_name
        var lastName = member.last_name

        var fullName
        if (middleName === null) {
            fullName = firstName + " " + lastName
        } else {
            fullName = firstName + " " + middleName + " " + lastName
        };

        // Creates Link
        var a = document.createElement('a');
        a.href = member.url;

        // Creates data cells 
        a.innerHTML = fullName
        td1.appendChild(a)

        td2.innerHTML = member.total_votes
        td3.innerHTML = member.votes_with_party_pct

        // Appends cells
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // Appends rows
        tableMost.appendChild(tr);
    })
}