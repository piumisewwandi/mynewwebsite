

    document.addEventListener("DOMContentLoaded", function () {
      // Event listener to handle form submission
      var form = document.querySelector(".form");
      var payButton = document.querySelector(".btn");
    
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior
    
        var cardHolder = document.getElementById('name').value;
        var cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, ''); // Remove spaces
        var cvc = document.getElementById('cvc').value;
        var expiryDate = document.getElementById('expDate').value;
    
        // Validate card holder's name (only letters and spaces)
        var isValidCardHolder = /^[a-zA-Z\s]+$/.test(cardHolder);
    
        // Validate card number (exactly 16 digits)
        var isValidCardNumber = /^\d{16}$/.test(cardNumber);
    
        // Validate CVV (exactly 3 digits)
        var isValidCVC = /^\d{3}$/.test(cvc);
    
        // Validate expiry date (in the format MM/YY)
        var currentDate = new Date();
        var enteredDateParts = expiryDate.split('/');
        var enteredMonth = parseInt(enteredDateParts[0]);
        var enteredYear = parseInt("20" + enteredDateParts[1]); // Assuming years are in the 21st century
    
        var isValidExpiryDate = !isNaN(enteredMonth) && !isNaN(enteredYear) && enteredMonth >= 1 && enteredMonth <= 12 &&
          enteredYear >= currentDate.getFullYear() && (enteredYear > currentDate.getFullYear() || enteredMonth >= currentDate.getMonth() + 1);
    
        // Enable the "Pay" button if all fields are valid
        payButton.disabled = !(isValidCardHolder && isValidCardNumber && isValidCVC && isValidExpiryDate);
    
        // If all fields are valid, redirect to Confirmation page
        if (!payButton.disabled) {
          window.location.href = "./confirmation.html";
        }
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
    });
    