// FILTERS STATES & CREATES OPTIONS

function fillsStateOptions() {

    // Creates array of States
    var states = []
    members.forEach((state) => {
        states.push(state.state)
    });

    // Removes duplicates
    states = states.filter(function (state, index) {
        return states.indexOf(state) === index;
    })

    // Sorts array
    states.sort()


    // Adds "All options"
    states.splice(0, 0, 'ALL STATES');


    // FILLS OPTIONS
    const selector = document.querySelector('.browser-default');
    states.forEach((i) => {
        var option = document.createElement("option");

        // Fills cell Data 
        option.innerHTML = [i]

        // Appends cells
        selector.appendChild(option);
    })
}


// Event listener

// Gets text value from Selected Option





// FILTERS BY PARTY AND FILLS OPTIONS

function fillsPartyOptions() {

    // Creates array of Parties
    var parties = []
    members.forEach((i) => {
        parties.push(i.party)
    });

    // Removes duplicates
    var parties = parties.filter(function (party, index) {
        return parties.indexOf(party) === index;
    })

    // Renders checkbox options
    var checkboxes = document.querySelector(".checkboxes")



    // ---------------- this section builds checkboxes from javascript -----------------

    // it generates checkboxes & content working with a bug (adds inverted commas and fucks with the display)

    // var generatecheckboxlist = function () {

    //     checkboxes.innerHTML = parties.map(function (party) {
    //         var html =
    //             '<div class="col s4">' +
    //             '<p>' +
    //             '<label>' +
    //             '<input checked="true" type="checkbox" data-filter="' + party + '" class="filled-in" id="cbox-Dem" />' +
    //             '<span>' + getPartyName(party) + '</span>' +
    //             '</label>' +
    //             '</p>' +
    //             '</div>'
    //         return html;
    //     });
    // }
    // generatecheckboxlist()
}

// ------------------------------------------------------------- WORKING WITH BUG
