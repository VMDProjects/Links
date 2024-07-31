// Function to apply filter to table rows
function applyFilter() {
    var filterValue = document.getElementById("filterInput").value.toLowerCase();
    var table = document.querySelector("table tbody");
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var match = false;
        for (var j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().indexOf(filterValue) > -1) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}

// Function to save table data to localStorage
function saveTableData() {
    var tableData = [];
    var rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
        var rowData = {
            link: row.cells[0].innerText,
            owner: row.cells[1].innerText,
            description: row.cells[2].innerText,
            name: row.cells[3].innerText,
            number: row.cells[4].innerText
        };
        tableData.push(rowData);
    });
    localStorage.setItem("tableData", JSON.stringify(tableData));
}

// Function to load table data from localStorage
function loadTableData() {
    var tableData = JSON.parse(localStorage.getItem("tableData"));
    if (tableData) {
        var tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";
        tableData.forEach(data => {
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td><a href="#">${data.link}</a></td>
                <td>${data.owner}</td>
                <td>${data.description}</td>
                <td>${data.name}</td>
                <td>${data.number}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }
}

// Event listener for form submission to add new row and save data
document.getElementById("addRowForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var link = document.getElementById("link").value;
    var owner = document.getElementById("owner").value;
    var description = document.getElementById("description").value;
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;

    var tableBody = document.getElementById("tableBody");
    var newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td><a href="#">${link}</a></td>
        <td>${owner}</td>
        <td>${description}</td>
        <td>${name}</td>
        <td>${number}</td>
    `;

    tableBody.appendChild(newRow);

    // Clear the form fields
    document.getElementById("link").value = "";
    document.getElementById("owner").value = "";
    document.getElementById("description").value = "";
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";

    saveTableData();
});

// Load table data from localStorage when the page is loaded
window.onload = function() {
    loadTableData();
};
