//Necessary for Materialize drop down menu, accordion, checkboxes
$(".dropdown-trigger").dropdown()
$('.collapsible').collapsible()
$('.materialboxed').materialbox()
$('select').formSelect()


// Main variables 
var title = document.title

var url;
if (title === "Senate Members") {
    url = 'https://api.propublica.org/congress/v1/116/senate/members.json'
} else if (title === "House Members") {
    url = 'https://api.propublica.org/congress/v1/116/house/members.json'
}

var members = []

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
            (data.results[0].members).forEach(member => {
                members.push(member)
            });
            fillTables()

        })
        .catch(function (error) {
            console.log(error)
        });

}