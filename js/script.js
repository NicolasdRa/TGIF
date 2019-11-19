//necessary for Materialize drop down menu
$(".dropdown-trigger").dropdown()
$('.collapsible').collapsible()
$('.materialboxed').materialbox()
$('select').formSelect()


// SPECIFIC FUNCTION SELECTOR

if (title === "Senate Members" || title === "House Members") {
    fillMainTables()
    fillsStateOptions()

} else if (title === "Senate Attendance" || title === "House Attendance") {
    fillaAtGlanceTable()
    fillLeastEngagedTable()
    fillMostEngagedTable()

} else if (title === "Senate Loyalty" || title === "House Loyalty") {
    fillaAtGlanceTable()
    fillLeastLoyalTable()
    fillMostLoyalTable()
}