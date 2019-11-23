function fillTables() {

    if (title === "Senate Members" || title === "House Members") {
        checkBoxesValues()
        filterByState()
        getSelectedText()
        fillMainTable()

    } else if (title === "Senate Attendance" || title === "House Attendance") {
        fillaAtGlanceTable()
        fillLeastEngagedTable()
        fillMostEngagedTable()

    } else if (title === "Senate Loyalty" || title === "House Loyalty") {
        fillaAtGlanceTable()
        fillLeastLoyalTable()
        fillMostLoyalTable()
    }

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
    getAverages()

    // ENGAGEMENT calculations


    // RUNS ALL STATISTICS
    function runStats() {
        members.forEach((member) => {
            createPartyArrays(member)
        })
    }
    runStats()


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


    // FILTER FUNCTION FOR CHECKBOXES

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


    // FILTER FUNCTION FOR STATES

    function filterByState() {

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
    }

    //Gets selected text from options
    function getSelectedText() {
        const ddmenu = document.querySelector('.browser-default');
        return ddmenu.options[ddmenu.selectedIndex].text;
    }


    // FILLS MAIN TABLES WITH MEMBERS

    function fillMainTable() {

        // Variables Checkbox Filter
        const tableBody = document.querySelector("tbody");
        var checkBoxes = checkBoxesValues()
        var ddmenu = getSelectedText()

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
}