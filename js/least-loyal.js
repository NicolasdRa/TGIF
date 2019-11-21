function fillLeastLoyalTable() {

    var sortedMembers = members.slice();
    sortedMembers.sort((a, b) => {
        return b.votes_against_party_pct - a.votes_against_party_pct;
    });


    // CREATES FIRST 10% 

    var cutLength = Math.round((members.length) * 0.1)
    var splicedMembers = sortedMembers.splice(0, cutLength)



    // ADDS DUPPLICATES

    splicedMembers.forEach((member) => {
        if (sortedMembers.votes_against_party_pct === splicedMembers[10].votes_against_party_pct) {
            splicedMembers.push(member)
        } else if (sortedMembers.votes_against_party_pct === splicedMembers[10].votes_against_party_pct) {
            splicedMembers.push(member)
        };
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