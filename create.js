document.addEventListener("DOMContentLoaded", function () {
    // Load and parse the Excel file
    fetch("data.xlsx")
        .then((response) => response.arrayBuffer())
        .then((data) => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            populateTable(jsonData);
        });

    // Populate table with Excel data
    function populateTable(data) {
        const tableBody = document.querySelector("#school-table tbody");

        data.forEach((row) => {
            const tableRow = document.createElement("tr");

            tableRow.innerHTML = `
                <td><img src="images/${row['Image File Name']}" alt="${row.Name}" width="100"></td>
                <td>${row.Name}</td>
                <td>${row.Place}</td>
                <td>${row['Post Available']}</td>
                <td>${row['Contact Number']}</td>
            `;

            tableBody.appendChild(tableRow);
        });
    }
});
