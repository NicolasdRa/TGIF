// JQuery necessary for Materialize components
$('.dropdown-trigger').dropdown()
$('.collapsible').collapsible()
$('.materialboxed').materialbox()
$('select').formSelect()
$('.sidenav').sidenav()

// Main variables
var title = document.title
var membersGlobal
var url
if (
  title === 'Senate Members' ||
  title === 'Senate Attendance' ||
  title === 'Senate Loyalty'
) {
  url = 'https://api.propublica.org/congress/v1/116/senate/members.json'
} else if (
  title === 'House Members' ||
  title === 'House Attendance' ||
  title === 'House Loyalty'
) {
  url = 'https://api.propublica.org/congress/v1/116/house/members.json'
}

// FETCH CONTROLER
if (
  title === 'Senate Members' ||
  title === 'House Members' ||
  title === 'Senate Attendance' ||
  title === 'House Attendance' ||
  title === 'Senate Loyalty' ||
  title === 'House Loyalty'
) {
  // DATA REQUEST
  fetch(url, {
    method: 'GET',
    headers: {
      'X-API-Key': 'zgVuv018iIYLQCaUljwf3zgKx6h7cd2MlsT1pHsT'
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      let members = data.results[0].members
      membersGlobal = members
      functionController(members)

      // hides preloaders on fetched
      const hidePreloaders = () => {
        let preloaders = document.querySelectorAll('.loader')
        preloaders.forEach(preloader => preloader.classList.add('hide'))
      }
      hidePreloaders()
    })
    .catch(error => {
      console.log(error)
    })
}

const functionController = members => {
  if (title === 'Senate Members' || title === 'House Members') {
    getSelectedText()
    checkBoxSelected()
    dropdownFilter(members)
    fillMainTable(members)
    runEventListeners(members)
  } else if (title === 'Senate Attendance' || title === 'House Attendance') {
    runStats(members)
    fillaAtGlanceTable()
    fillLeastEngagedTable(members)
    fillMostEngagedTable(members)
  } else if (title === 'Senate Loyalty' || title === 'House Loyalty') {
    runStats(members)
    fillaAtGlanceTable()
    fillLeastLoyalTable(members)
    fillMostLoyalTable(members)
  }
}
