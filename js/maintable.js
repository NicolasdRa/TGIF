// FILTER FUNCTION FOR CHECKBOXES

// Event listeners
var checkBoxSelection = document.querySelector('.checkboxes')
checkBoxSelection.addEventListener('change', fillMainTables)

var dropDownMenu = document.querySelector('.browser-default')
dropDownMenu.addEventListener('onselect', fillMainTables)


// Returns array of Values from Checked Checkboxes

function checkBoxesValues() {
    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
    }
    return array
}

// Determines 

// FILLS MAIN TABLES WITH MEMBERS

function fillMainTables() {

    // Selects Table Bodies
    const tableBody = document.querySelector("tbody");
    var checkBoxes = checkBoxesValues()
      
    // Clears Tables before printing members
    tableBody.innerHTML = ""
    
    // Creates Tables and fills content   
    members.forEach((member) => {

        // Checks if Party Name is included in the array before creating element
        if (checkBoxes.includes(member.party)) {

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