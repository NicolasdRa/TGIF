function fillMostEngagedTable () {
  var sortedMembersMost = members.slice()
  sortedMembersMost.sort((a, b) => {
    return a.missed_votes_pct - b.missed_votes_pct
  })

  console.log(sortedMembersMost)

  // CREATES FIRST 10%
  var cutLength = Math.round(members.length * 0.1)

  var splicedMembersMost = sortedMembersMost.splice(0, cutLength)

  console.log(splicedMembersMost)

  // ADDS DUPPLICATES
  splicedMembersMost.forEach(member => {
    if (
      sortedMembersMost.missed_votes_pct ===
      splicedMembersMost[10].missed_votes_pct
    ) {
      splicedMembers.push(member)
    } else if (
      sortedMembersMost.missed_votes_pct ===
      splicedMembersMost[10].missed_votes_pct
    ) {
      splicedMembersMost.push(member)
    }
  })

  // FILL TABLES
  const tableMost = document.querySelector('#Most-Engaged')

  splicedMembersMost.forEach(member => {
    const tr = document.createElement('tr')

    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')

    // Creates Full-Name Field
    var firstName = member.first_name
    var middleName = member.middle_name
    var lastName = member.last_name

    var fullName
    if (middleName === null) {
      fullName = firstName + ' ' + lastName
    } else {
      fullName = firstName + ' ' + middleName + ' ' + lastName
    }

    // Creates Link
    var a = document.createElement('a')
    a.href = member.url

    // Creates data cells
    a.innerHTML = fullName
    td1.appendChild(a)

    td2.innerHTML = member.missed_votes
    td3.innerHTML = member.missed_votes_pct

    // Appends cells
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    // Appends rows
    tableMost.appendChild(tr)
  })
}
