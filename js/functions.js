// STATS

const runStats = members => {
  // CREATES  new array for each party
  const demArray = [...new Set(members.filter(member => member.party === 'D'))]
  const repArray = [...new Set(members.filter(member => member.party === 'R'))]
  const indArray = [...new Set(members.filter(member => member.party === 'I'))]

  getAverages(demArray, repArray, indArray)
}

// Statistics OBJECT
const statistics = {
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  plDemocrats: 0,
  plRepublicans: 0
}

// PARTY LOYALTY calculations / Global
const getAverages = (demArray, repArray, indArray) => {
  // filters missing values, adds up total and makes average
  const plWithDem =
    demArray
      .filter(
        member =>
          member.missed_votes_pct != null ||
          member.missed_votes_pct != undefined
      )
      .reduce(
        (accumulator, member) => accumulator + member.votes_with_party_pct,
        0
      ) / demArray.length

  // filters missing values, adds up total and makes average
  const plWithRep =
    repArray
      .filter(
        member =>
          member.missed_votes_pct != null ||
          member.missed_votes_pct != undefined
      )
      .reduce(
        (accumulator, member) => accumulator + member.votes_with_party_pct,
        0
      ) / repArray.length

  // Fills empty object initialised globally
  statistics.Democrats = demArray.length
  statistics.Republicans = repArray.length
  statistics.Independents = indArray.length
  statistics.plDemocrats = plWithDem
  statistics.plRepublicans = plWithRep
}

// ----------------------------------------------------------------------- //

// FILTERS

//Variables Checkbox / Dropdown / eventListner
// const tBodyMain = document.querySelector('#main-table')
const ddmenu = document.querySelector('.browser-default')

// Checkbox filter (by Party) - Returns array of Checked Boxes
const checkBoxSelected = () => {
  const values = []
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  checkboxes.forEach(checkbox => values.push(checkbox.value))
  return values
}

// Dropdown filter (by State)
const dropdownFilter = (members, states) => {
  states = []
  members.forEach(member => {
    states.push(member.state)
  })

  // Removes duplicates --
  states = [...new Set(states)]

  // Sorts and adds "All States" value
  states.sort().unshift('ALL STATES')

  // creates OPTION for each state and fills data
  states.forEach(state => {
    const option = document.createElement('option')
    option.innerHTML = [state]
    ddmenu.appendChild(option)
  })
}

//Gets selected text from options
const getSelectedText = () => {
  return ddmenu.options[ddmenu.selectedIndex].text
}

// EVENT LISTENERS
const runEventListeners = () => {
  // Checkboxes
  const checkBoxes = document.getElementById('checkbox-filter')
  checkBoxes.addEventListener('change', fillMainTable)

  // Dropdown Menu
  ddmenu.addEventListener('change', fillMainTable)
}

// ----------------------------------------------------------------------- //

// TABLES

// MAIN
const fillMainTable = () => {
  const table = document.querySelector('#main-table')
  const members = membersGlobal
  const selectedText = getSelectedText()
  const checkBoxSelection = checkBoxSelected()

  // Clears Tables before printing members
  table.innerHTML = ''

  // Member controller
  members.forEach(member => {
    // Checks if Party is included in the array before creating element
    if (
      (selectedText === 'ALL STATES' || selectedText === 'Choose State') &&
      checkBoxSelection.includes(member.party)
    ) {
      generateTable(table, member)
    } else if (
      checkBoxSelection.includes(member.party) &&
      selectedText === member.state
    ) {
      generateTable(table, member)
    }
  })
}

// AT A GLANCE
const fillaAtGlanceTable = () => {
  const table = document.querySelector('#at-a-glance')

  // data for table
  const parties = [
    {
      name: 'Democrats',
      noRep: statistics.Democrats,
      pl: statistics.plDemocrats
    },

    {
      name: 'Republicans',
      noRep: statistics.Republicans,
      pl: statistics.plRepublicans
    },

    {
      name: 'Independents',
      noRep: statistics.Independents,
      pl: null
    },

    {
      name: 'Totals',
      noRep:
        statistics.Democrats + statistics.Republicans + statistics.Independents,
      pl: (statistics.plDemocrats + statistics.plRepublicans) / 2
    }
  ]

  // fills table
  parties.forEach(party => {
    generateTableAAG(table, party)
  })
}

// LEAST ENGAGED
const fillLeastEngagedTable = members => {
  const table = document.querySelector('#least-engaged')

  members.sort((a, b) => b.missed_votes - a.missed_votes)
  const finalSelection = selectMembers(table, members)

  // fills table
  finalSelection.forEach(member => generateTable(table, member))
}

// // MOST ENGAGED
const fillMostEngagedTable = members => {
  const table = document.querySelector('#most-engaged')

  members.sort((a, b) => a.missed_votes - b.missed_votes)
  const finalSelection = selectMembers(table, members)

  // fills table
  finalSelection.forEach(member => generateTable(table, member))
}

// LEAST LOYAL
const fillLeastLoyalTable = members => {
  const table = document.querySelector('#least-loyal')

  members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
  const finalSelection = selectMembers(table, members)

  // fills table
  finalSelection.forEach(member => generateTable(table, member))
}

// MOST LOYAL
const fillMostLoyalTable = members => {
  const table = document.querySelector('#most-loyal')

  members.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
  const finalSelection = selectMembers(table, members)

  // fills table
  finalSelection.forEach(member => generateTable(table, member))
}

// ----------------------------------------------------------------------- //
// UTILS

// selects 10% of members and adds duplicate values
const selectMembers = (table, members) => {
  const cutLength = Math.round(members.length * 0.1)
  const finalSelection = members.slice(0, cutLength)
  const lastMember = finalSelection[finalSelection.length - 1]

  table == 'least-engaged' || table == 'least-engaged'
    ? members.forEach(member => {
        if (
          member.missed_votes === lastMember.missed_votes &&
          member !== lastMember
        ) {
          finalSelection.push(member)
        }
      })
    : members.forEach(member => {
        if (
          member.missed_votes === lastMember.missed_votes &&
          member !== lastMember
        ) {
          finalSelection.push(member)
        }
      })
  return finalSelection
}

// ----------------------------------------------------------------------- //
// TABLE GENERATOR

// Main Tables
const generateTable = (table, data) => {
  let row = table.insertRow()
  let cell1 = row.insertCell(0)
  let cell2 = row.insertCell(1)
  let cell3 = row.insertCell(2)
  const a = document.createElement('a')
  a.href = data.url
  let fullName
  data.middle_name !== null
    ? (fullName = `${data.first_name} ${data.middle_name}${data.last_name}`)
    : (fullName = `${data.first_name} ${data.last_name}`)
  a.innerHTML = fullName

  switch (table.id) {
    case 'main-table':
      let cell4 = row.insertCell(3)
      let cell5 = row.insertCell(4)
      cell1.appendChild(a)
      cell2.innerHTML = data.party
      cell3.innerHTML = data.state
      cell4.innerHTML = data.seniority
      cell5.innerHTML = data.votes_with_party_pct
      break

    case 'least-engaged':
    case 'most-engaged':
      cell1.appendChild(a)
      cell2.innerHTML = data.missed_votes
      cell3.innerHTML = data.missed_votes_pct
      break

    // case 'most-engaged':
    //   cell1.appendChild(a)
    //   cell2.innerHTML = data.missed_votes
    //   cell3.innerHTML = data.missed_votes_pct
    //   break

    case 'least-loyal':
    case 'most-loyal':
      cell1.appendChild(a)
      cell2.innerHTML = data.total_votes
      cell3.innerHTML = data.votes_with_party_pct
      break

    // case 'most-loyal':
    //   cell1.appendChild(a)
    //   cell2.innerHTML = data.total_votes
    //   cell3.innerHTML = data.votes_with_party_pct
    //   break
  }
}

// At a Glance Table
const generateTableAAG = (table, data) => {
  let row = table.insertRow()
  let cell1 = row.insertCell(0)
  let cell2 = row.insertCell(1)
  let cell3 = row.insertCell(2)
  cell1.innerHTML = data.name
  cell2.innerHTML = data.noRep
  cell3.innerHTML = Math.round(data.pl * 1e2) / 1e2
}
