//Summary table section
// Get the summary data from local storage
const storedSummaryData = localStorage.getItem("summaryData");
const storedUserData = localStorage.getItem("userData");

if (storedUserData) {
    var userData = JSON.parse(storedUserData);
}

if (storedSummaryData) {
  // Parse the JSON string back to an array
  const summaryData = JSON.parse(storedSummaryData);

  // Get the summary table element
  const summaryTable = document.getElementById("summary-table");

  // Clear the existing table content
  summaryTable.innerHTML = "";

  // Add user details to the top of the table
  summaryTable.innerHTML += `
  <tr>
  <td>Name: </td>
  <td>${userData.fullName}<td>
  </tr>
  <tr>
  <td>Mobile Number: </td>
  <td>${userData.phoneNumber}</td>
  </tr>
  <tr>
  <td>Email: </td>
  <td>${userData.email}</td>
  </tr>
  <tr>
  <td>Gender: </td>
  <td>${userData.gender}</td>
  </tr>
  `

  // Populate the table with the stored summary data
  summaryData.forEach(rowData => {
    const row = document.createElement("tr");
    const [label, value] = rowData;

    const labelCell = document.createElement("td");
    labelCell.textContent = label;

    const valueCell = document.createElement("td");
    valueCell.textContent = value;

    row.appendChild(labelCell);
    row.appendChild(valueCell);
    summaryTable.appendChild(row);
  });
}
