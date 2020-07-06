function generateTable (table, data) {
  for (let element of data) {
    let row = table.insertRow()
    for (key in element) {
      let cell = row.insertCell()
      let text = document.createTextNode(element[key])
      cell.appendChild(text)
    }
  }
}

// Create a function that generates a table taking given (table, data) use two forEach nested loops to build rows and cells inside. Find the way to append the data to corresponding cells.

// Replace all manual table generators for a function that takes the data from which to build the it.

// Replace buggy functios that create a ghost row with undefined date in the end and clean up the code for good.
