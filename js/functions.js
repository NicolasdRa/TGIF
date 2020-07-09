// FILTERS

//Variables Checkbox / Dropdown
const tableBody = document.querySelector('#main-table')
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

  // Sorts array
  states.sort()

  // Adds "All options"
  states.splice(0, 0, 'ALL STATES')

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

// Creates Main Tables content
const fillMainTable = () => {
  const members = membersGlobal
  const selectedText = getSelectedText()
  const checkBoxSelection = checkBoxSelected()

  // Clears Tables before printing members
  tableBody.innerHTML = ''

  // Member controller
  members.forEach(member => {
    // Checks if Party is included in the array before creating element
    if (
      (selectedText === 'ALL STATES' || selectedText === 'Choose State') &&
      checkBoxSelection.includes(member.party)
    ) {
      insertMembers(member)
    } else if (
      checkBoxSelection.includes(member.party) &&
      selectedText === member.state
    ) {
      insertMembers(member)
    }
  })
}

// General Member Injector Function
const insertMembers = member => {
  const tr = document.createElement('tr')
  const td1 = document.createElement('td')
  const td2 = document.createElement('td')
  const td3 = document.createElement('td')
  const td4 = document.createElement('td')
  const td5 = document.createElement('td')

  // Creates Full-Name Field
  const firstName = member.first_name
  const middleName = member.middle_name
  const lastName = member.last_name

  let fullName
  if (middleName === null) {
    fullName = firstName + ' ' + lastName
  } else {
    fullName = firstName + ' ' + middleName + ' ' + lastName
  }

  // Creates Link
  const a = document.createElement('a')
  a.href = member.url

  // Creates data cells
  a.innerHTML = fullName
  td1.appendChild(a)
  td2.innerHTML = member.party
  td3.innerHTML = member.state
  td4.innerHTML = member.seniority
  td5.innerHTML = member.votes_with_party_pct

  // Appends cells
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tr.appendChild(td5)

  // Appends rows
  tableBody.appendChild(tr)
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
  // filters missing values in array
  const cleanDemArray = demArray.filter(
    member =>
      member.missed_votes_pct != null || member.missed_votes_pct != undefined
  )

  // Adds Values
  const plWithDem =
    cleanDemArray.reduce(
      (accumulator, member) => accumulator + member.votes_with_party_pct,
      0
    ) / cleanDemArray.length

  // filters missing values in array
  const cleanRepArray = repArray.filter(
    member =>
      member.missed_votes_pct != null || member.missed_votes_pct != undefined
  )

  // Adds Values
  const plWithRep =
    cleanRepArray.reduce(
      (accumulator, member) => accumulator + member.votes_with_party_pct,
      0
    ) / cleanRepArray.length

  // Fills empty object initialised globally
  statistics.Democrats = demArray.length
  statistics.Republicans = repArray.length
  statistics.Independents = indArray.length
  statistics.plDemocrats = plWithDem
  statistics.plRepublicans = plWithRep
}

// -------------------------------------------------------------------- //
// TABLES

// AT A GLANCE
const fillaAtGlanceTable = () => {
  // Selects Table Bodies
  const tBodyatAGlance = document.querySelector('#at-a-glance')

  // Data for table
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

  generateTableAAG(tBodyatAGlance, parties)
}

// LEAST ENGAGED
const fillLeastEngagedTable = members => {
  const sortedMembers = members.sort((a, b) => b.missed_votes - a.missed_votes)

  // CREATES FIRST 10%
  const cutLength = Math.round(sortedMembers.length * 0.1)
  const tenPercent = sortedMembers.slice(0, cutLength)
  const lastMember = tenPercent[tenPercent.length - 1]

  // ADDS DUPLICATES
  sortedMembers.forEach(member => {
    if (
      member.missed_votes === lastMember.missed_votes &&
      member !== lastMember
    ) {
      tenPercent.push(member)
    }
  })

  // FILL TABLES
  const tBodyLeast = document.querySelector('#least-engaged')
  generateTableAL(tBodyLeast, tenPercent)
}

// MOST ENGAGED
const fillMostEngagedTable = members => {
  const sortedMembers = members.sort((a, b) => a.missed_votes - b.missed_votes)

  // CREATES FIRST 10%
  const cutLength = Math.round(sortedMembers.length * 0.1)
  const tenPercent = sortedMembers.slice(0, cutLength)
  const lastMember = tenPercent[tenPercent.length - 1]

  // ADDS DUPPLICATES
  sortedMembers.forEach(member => {
    if (
      member.missed_votes === lastMember.missed_votes &&
      member !== lastMember
    ) {
      tenPercent.push(member)
    }
  })

  // FILL TABLES
  const tBodyMost = document.querySelector('#most-engaged')

  generateTableAL(tBodyMost, tenPercent)
}

// LEAST LOYAL
const fillLeastLoyalTable = members => {
  const sortedMembers = members.sort(
    (a, b) => a.votes_with_party_pct - b.votes_with_party_pct
  )

  // CREATES FIRST 10%
  const cutLength = Math.round(sortedMembers.length * 0.1)
  const tenPercent = sortedMembers.slice(0, cutLength)
  const lastMember = tenPercent[tenPercent.length - 1]

  // ADDS DUPLICATES
  sortedMembers.forEach(member => {
    if (
      member.votes_with_party_pct === lastMember.votes_with_party_pct &&
      member !== lastMember
    ) {
      tenPercent.push(member)
    }
  })

  // FILL TABLES
  const tbodyLeastL = document.querySelector('#least-loyal')
  generateTableAL(tbodyLeastL, tenPercent)
}

// MOST LOYAL
const fillMostLoyalTable = members => {
  const sortedMembers = members.sort(
    (a, b) => b.votes_with_party_pct - a.votes_with_party_pct
  )

  // CREATES FIRST 10%
  const cutLength = Math.round(sortedMembers.length * 0.1)
  const tenPercent = sortedMembers.slice(0, cutLength)
  const lastMember = tenPercent[tenPercent.length - 1]

  // ADDS DUPPLICATES
  sortedMembers.forEach(member => {
    if (
      member.votes_with_party_pct === lastMember.votes_with_party_pct &&
      member !== lastMember
    ) {
      tenPercent.push(member)
    }
  })

  // FILL TABLES
  const tBodyMostL = document.querySelector('#most-loyal')
  generateTableAL(tBodyMostL, tenPercent)
}
