
//document.addEventListener("DOMContentLoaded", function () {
    /*var input = document.querySelector(".telno");
    var iti = window.intlTelInput(input, {
        initialCountry: "auto",
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js",
    });*/

     //Event listener to handle form submission
     /*var form = document.getElementById("detailsForm"); 
     form.addEventListener("submit", function (event) {
         event.preventDefault();

    // Get user inputs
    var fullName = document.querySelector('.fullName').value;
    var phoneNumber = document.querySelector('.telno').value;
    var email = document.querySelector('.email').value;
    var confirmEmail = document.querySelector('#details:nth-child(5)').value;
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
});*/



//NEW CODE
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("detailsForm"); 
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var fullName = document.querySelector('.fullName').value;
        var phoneNumber = document.querySelector('.telno').value;
        var email = document.querySelector('.email').value;
        var confirmEmail = document.querySelector('.email2').value;
        var gender = document.getElementById("gender").value;

        if (email !== confirmEmail) {
            alert("Email addresses do not match.");
            return;
        }

        if (fullName && phoneNumber && email && confirmEmail && gender !== "Select Gender") {
            var userData = {
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email,
                gender: gender
            };
            
            localStorage.setItem("userData", JSON.stringify(userData));
            window.location.replace("./Payment.html");
        } else {
            alert("Please fill in all required fields.");
        }
    });
});



//DID NOT CHANGE THE CODE FOR THE SUMMARY TABLE

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
  
  




