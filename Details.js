document.addEventListener("DOMContentLoaded", function () {
    /*var input = document.querySelector(".telno");
    var iti = window.intlTelInput(input, {
        initialCountry: "auto",
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js",
    });*/

     // Event listener to handle form submission
var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user inputs
    var fullName = document.querySelector('.fullName').value;
    var phoneNumber = iti.getNumber();
    var email = document.querySelector('.email').value;
    var confirmEmail = document.querySelector('#details:nth-child(4)').value;
    var gender = document.getElementById("gender").value;

    // Validate email fields match
    if (email !== confirmEmail) {
        alert("Email addresses do not match.");
        return;
    }

    // Check if all fields are filled correctly
    if (fullName && phoneNumber && email && confirmEmail && gender !== "Select Gender") {
        // Create an object to store user data
        var userData = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            gender: gender
        };

        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirect to Payment page
        window.location.replace("./Payment.html");
    } else {
        // Display a message indicating that fields are missing
        alert("Please fill in all required fields.");
    }
});

// Add click event listener to "Continue with Purchase" button
var continueButton = document.querySelector(".btn");
continueButton.addEventListener("click", function () {
    // Redirect to Payment page
    window.location.replace("./Payment.html");
});
});




//Summary table section
    // Get the summary data from local storage
    const storedSummaryData = localStorage.getItem("summaryData");

    if (storedSummaryData) {
      // Parse the JSON string back to an array
      const summaryData = JSON.parse(storedSummaryData);
  
      // Get the summary table element
      const summaryTable = document.getElementById("summary-table");
  
      // Clear the existing table content
      summaryTable.innerHTML = "";
  
      // Populate the table with the stored data
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
  
  


