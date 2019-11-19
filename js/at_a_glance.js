function fillaAtGlanceTable() {

    // Selects Table Bodies

    const tableBodyatGlance = document.querySelector("#At_a_Glance")


    // Creates array with data
    let parties = [

        {
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