var title = document.title

var members;
if (title === "Senate Members" || title === "Senate Attendance" || title === "Senate Loyalty") {
    members = dataSenate.results[0].members;
} else {
    members = dataHouse.results[0].members;
}
