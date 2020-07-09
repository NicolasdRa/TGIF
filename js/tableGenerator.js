// Main Tables
const generateTableMain = (table, data) => {
  let row = table.insertRow()
  let cell1 = row.insertCell(0)
  let cell2 = row.insertCell(1)
  let cell3 = row.insertCell(2)
  let cell4 = row.insertCell(3)
  let cell5 = row.insertCell(4)
  const a = document.createElement('a')
  a.href = data.url

  let fullName
  data.middle_name != null
    ? (fullName = `${data.first_name} ${data.middle_name}${data.last_name}`)
    : (fullName = `${data.first_name} ${data.last_name}`)

  a.innerHTML = fullName
  cell1.appendChild(a)
  cell2.innerHTML = data.party
  cell3.innerHTML = data.state
  cell4.innerHTML = data.seniority
  cell5.innerHTML = data.votes_with_party_pct
}

// At a Glance Tables
const generateTableAAG = (table, data) => {
  table.innerHTML = ''
  data.forEach(i => {
    let row = table.insertRow()
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    cell1.innerHTML = i.name
    cell2.innerHTML = i.noRep
    cell3.innerHTML = Math.round(i.pl * 1e2) / 1e2
  })
}

// Attendance & Loyalty Tables
const generateTableAL = (table, data) => {
  table.innerHTML = ''
  data.forEach(i => {
    let row = table.insertRow()
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    const a = document.createElement('a')
    let fullName
    i.middle_name != null
      ? (fullName = `${i.first_name} ${i.middle_name}${i.last_name}`)
      : (fullName = `${i.first_name} ${i.last_name}`)
    a.href = i.url
    a.innerHTML = fullName
    cell1.appendChild(a)
    let value2
    table === 'least-engaged' || table === 'most-engaged'
      ? (value2 = i.missed_votes)
      : (value2 = i.total_votes)
    cell2.innerHTML = value2
    let value3
    table === 'least-engaged' || table === 'most-engaged'
      ? (value3 = i.missed_votes_pct)
      : (value3 = i.votes_with_party_pct)
    cell3.innerHTML = value3
  })
}
