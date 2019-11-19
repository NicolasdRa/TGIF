function fillsStateOptions() {

    // Creates array of States
    var states = []

    members.forEach((state) => {
        states.push(state.state)
    });

    // Removes duplicates
    states.forEach((i) => {
        if (states[i] === states[i])
            states.splice(1, 1)
    });

    // Sorts array
    states.sort()


    // FILL TABLES
    const selector = document.querySelector('.browser-default');

    states.forEach((i) => {

        var option = document.createElement("option");
        
        // Fills cell Data 

        option.innerHTML = [i]
       
        // Appends cells
        selector.appendChild(option);
    })
}