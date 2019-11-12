//necessary for Materialize drop down menu
$(".dropdown-trigger").dropdown()
$('.collapsible').collapsible()
$('.materialboxed').materialbox()

// Selects Table Bodies
const tableBody = document.querySelector("tbody");

// Selects field members from Data files

let title = document.title

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

