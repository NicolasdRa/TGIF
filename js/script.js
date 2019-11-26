// Necessary for Materialize drop down menu, accordion, checkboxes
$(".dropdown-trigger").dropdown()
$('.collapsible').collapsible()
$('.materialboxed').materialbox()
$('select').formSelect()


// Main variables 
var title = document.title

var url;
if (title === "Senate Members" || title === "Senate Attendance" || title === "Senate Loyalty") {
    url = 'https://api.propublica.org/congress/v1/116/senate/members.json'
} else if (title === "House Members" || title === "House Attendance" || title === "House Loyalty") {
    url = 'https://api.propublica.org/congress/v1/116/house/members.json'
}


// FETCH CONTROLER
if (title === "Senate Members" || title === "House Members" || title === "Senate Attendance" || title === "House Attendance" || title === "Senate Loyalty" || title === "House Loyalty") {

    // DATA REQUEST
    fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "zgVuv018iIYLQCaUljwf3zgKx6h7cd2MlsT1pHsT"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //(data.results[0].members).forEach(member => {
            //   members.push(member)
            // });
            var members = data.results[0].members

            fillTables(members)

            //document.querySelector(".preloader-wrapper big active").style.display ='none';
            $('#loader').addClass("hide-loader");

        })
        .catch(function (error) {
            console.log(error)
        });
}

function fillTables(members) {

    if (title === "Senate Members" || title === "House Members") {
        runCheckboxFilter()
        runDdFilter(members)
        fillMainTable(members)

    } else if (title === "Senate Attendance" || title === "House Attendance") {
        runStats(members)
        fillaAtGlanceTable()
        fillLeastEngagedTable(members)
        fillMostEngagedTable(members)

    } else if (title === "Senate Loyalty" || title === "House Loyalty") {
        runStats(members)
        fillaAtGlanceTable()
        fillLeastLoyalTable(members)
        fillMostLoyalTable(members)
    }
}