//Filter Variables Checkbox / Dropdown
const tableBody = document.querySelector('tbody')
const ddmenu = document.querySelector('.browser-default')

// CHECKBOX FILTER (by party)
// Returns array of Values from Checked Checkboxes
const checkBoxSelected = () => {
  const values = []
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  checkboxes.forEach(checkbox => values.push(checkbox.value))
  return values
}

// DROPDOWN FILTER (by State)
// Runs Dropdown Filter
const runDropdownFilter = (members, states) => {
  // Creates array of States
  states = []
  members.forEach(state => {
    states.push(state.state)
  })

  // Removes duplicates
  states = states.filter((state, index) => {
    return states.indexOf(state) === index
  })

  // Sorts array
  states.sort()

  // Adds "All options"
  states.splice(0, 0, 'ALL STATES')

  // Fills OPTIONS with State Names
  states.forEach(state => {
    const option = document.createElement('option')

    // Fills cell Data
    option.innerHTML = [state]

    // Appends cells
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
      ((member !== undefined &&
        member !== null &&
        selectedText === 'ALL STATES') ||
        selectedText === 'Choose State') &&
      checkBoxSelection.includes(member.party)
    ) {
      insertMembers(member)
    } else if (
      member !== undefined &&
      member !== null &&
      checkBoxSelection.includes(member.party) &&
      selectedText === member.state
    ) {
      insertMembers(member)
    }
  })
  console.log(members)
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

// RUNS ALL STATISTICS / GLobal
const runStats = members => {
  // CREATES  new array for each party
  const demArray = []
  const repArray = []
  const indArray = []

  const createPartyArrays = mem => {
    if (mem.party === 'D') {
      demArray.push(mem)
    } else if (mem.party === 'R') {
      repArray.push(mem)
    } else if (mem.party === 'I') {
      indArray.push(mem)
    }
  }

  // Creates party arrays
  members.forEach(member => {
    createPartyArrays(member)
  })

  getAverages(demArray, repArray, indArray)
}

const getAverages = (demArray, repArray, indArray) => {
  // PARTY LOYALTY calculations / Global

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

// Statistics OBJECT
const statistics = {
  Democrats: 0,
  Republicans: 0,
  Independents: 0,
  plDemocrats: 0,
  plRepublicans: 0,
  mostEngaged: 'null',
  leastEngaged: 'null'
}

// FILLS AT A GLANCE TABLES
const fillaAtGlanceTable = () => {
  // Selects Table Bodies
  const tableBodyatGlance = document.querySelector('#At_a_Glance')

  // Creates array with Party Data for At a Glance Tables
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
      pl: 'null'
    },

    {
      name: 'Totals',
      noRep:
        statistics.Democrats + statistics.Republicans + statistics.Independents,
      pl: (statistics.plDemocrats + statistics.plRepublicans) / 2
    }
  ]

  // Creates Table elements and fills content
  parties.forEach(party => {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')

    // Creates data cells
    td1.innerHTML = party.name
    td2.innerHTML = party.noRep
    td3.innerHTML = Math.round(party.pl * 1e2) / 1e2

    // Appends cells
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    // Appends rows
    tableBodyatGlance.appendChild(tr)
  })
}

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
  const tableLeast = document.querySelector('#Least-Engaged')

  tenPercent.forEach(member => {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')

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

    td2.innerHTML = member.missed_votes
    td3.innerHTML = member.missed_votes_pct

    // Appends cells
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    // Appends rows
    tableLeast.appendChild(tr)
  })
}

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
  const tableMost = document.querySelector('#Most-Engaged')

  tenPercent.forEach(member => {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')

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

const fillLeastLoyalTable = members => {
  const sortedMembers = members.sort(
    (a, b) => b.votes_against_party_pct - a.votes_against_party_pct
  )

  // CREATES FIRST 10%
  const cutLength = Math.round(sortedMembers.length * 0.1)
  const tenPercent = sortedMembers.slice(0, cutLength)
  const lastMember = tenPercent[tenPercent.length - 1]

  // ADDS DUPLICATES
  sortedMembers.forEach(member => {
    if (
      member.votes_against_party_pct === lastMember.votes_against_party_pct &&
      member !== lastMember
    ) {
      tenPercent.push(member)
    }
  })

  // FILL TABLES
  const tableLeast = document.querySelector('#Least-Loyal')

  tenPercent.forEach(member => {
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

    td2.innerHTML = member.total_votes
    td3.innerHTML = member.votes_with_party_pct

    // Appends cells
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    // Appends rows
    tableLeast.appendChild(tr)
  })
}

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
  const tableMost = document.querySelector('#Most-Loyal')

  tenPercent.forEach(member => {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')

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

    td2.innerHTML = member.total_votes
    td3.innerHTML = member.votes_with_party_pct

    // Appends cells
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    // Appends rows
    tableMost.appendChild(tr)
  })
}
