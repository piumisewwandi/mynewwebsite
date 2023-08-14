//calendar fuction

          const calendar = document.getElementById("calendar");
          const currentMonth = document.getElementById("currentMonth");
          const prevMonthBtn = document.getElementById("prevMonth");
          const nextMonthBtn = document.getElementById("nextMonth");
          const selectedDateBox = document.getElementById("selectedDateBox");
          const selectedDateSpan = document.getElementById("selectedDate");

          const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

          let currentDate = new Date();
          let selectedDate = currentDate.getDate(); // Set the default selected date as the current date

          function renderCalendar() {
            calendar.innerHTML = "";
            currentMonth.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

          // Add weekday names to the header
            for (const weekday of weekdays) {
              const weekdayHeader = document.createElement("div");
              weekdayHeader.className = "day weekday";
              weekdayHeader.textContent = weekday;
              calendar.appendChild(weekdayHeader);
            }

            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
              const emptyDay = document.createElement("div");
              emptyDay.className = "day";
              calendar.appendChild(emptyDay);
            }

            for (let i = 1; i <= lastDay; i++) {
              const dayElement = document.createElement("div");
              dayElement.className = "day";
              dayElement.textContent = i;
              dayElement.addEventListener("click", () => selectDate(i));
              
          // Highlight the default selected date
              if (selectedDate === i && currentDate.getMonth() === currentDate.getMonth()) {
                dayElement.classList.add("selected");
              }
              
              calendar.appendChild(dayElement);
            }
          }

          function selectDate(day) {
            selectedDate = day;
            selectedDateSpan.textContent = currentDate.toLocaleString("default", { month: "long" }) + " " + day + ", " + currentDate.getFullYear();
            renderCalendar();
            saveSelectedDate();
          }

          function saveSelectedDate() {
            if (selectedDate !== null) {
              const selectedDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`;
              localStorage.setItem("selectedDate", selectedDateString);
            }
          }

          function loadSelectedDate() {
            const selectedDateString = localStorage.getItem("selectedDate");
            if (selectedDateString) {
              const parts = selectedDateString.split("-");
              const year = parseInt(parts[0]);
              const month = parseInt(parts[1]) - 1;
              const day = parseInt(parts[2]);
              
              currentDate = new Date(year, month, day);
              selectedDate = day;
              renderCalendar();
            }
          }

          prevMonthBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            saveSelectedDate();
            renderCalendar();
          });

          nextMonthBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            saveSelectedDate();
            renderCalendar();
          });

          // Load selected date on page load
          loadSelectedDate();
          renderCalendar();




// Guest selection section
          const guestBoxes = document.querySelectorAll(".subsection-2 .box-container");
          const defaultGuestCounts = {
              "SL Child": 0,
              "SL Adult": 0,
              "Foreigner Child": 0, 
              "Foreigner Adult": 1,
              "Infant": 0
          };
          const guestCounts = defaultGuestCounts;

        // Clearing the local storage when refreshing
          localStorage.removeItem("guestCounts");

          guestBoxes.forEach(box => {
              const guestType = box.querySelector("label").textContent.trim();
              const input = box.querySelector("input");

        // guest count
              guestCounts[guestType] = parseInt(input.value) || guestCounts[guestType];
              input.value = guestCounts[guestType];


        // Event listeners for the up and down buttons
              box.querySelector(".up").addEventListener("click", () => {
                  guestCounts[guestType]++;
                  input.value = guestCounts[guestType];
                  saveGuestCountsToLocalStorage();
              });

              box.querySelector(".down").addEventListener("click", () => {
                  if (guestCounts[guestType] > 0) {
                      guestCounts[guestType]--;
                      input.value = guestCounts[guestType];
                      saveGuestCountsToLocalStorage();
                  }
              });
          });

          // Function to save guest counts to local storage
          function saveGuestCountsToLocalStorage() {
              localStorage.setItem("guestCounts", JSON.stringify(guestCounts));
          }

          // Function to load guest counts from local storage
          function loadGuestCountsFromLocalStorage() {
              const storedGuestCounts = localStorage.getItem("guestCounts");
              if (storedGuestCounts) {
                  Object.assign(guestCounts, JSON.parse(storedGuestCounts));
                  for (const guestType in guestCounts) {
                      const input = document.querySelector(`.subsection-2 input#${guestType.replace(/ /g, "")}`);
                      if (input) {
                          input.value = guestCounts[guestType];
                      }
                  }
              } 
              else
              {
                  // Set default guest counts if not stored in local storage
                  for (const guestType in guestCounts) 
                  {
                      guestCounts[guestType] = defaultGuestCounts[guestType];
                      const input = document.querySelector(`.subsection-2 input[name="${guestType}"]`);
                      if (input) 
                      {
                          input.value = guestCounts[guestType];
                      }
                  } 
                  saveGuestCountsToLocalStorage();
              }
          }


    

      //Duration section
      const durationSelect = document.getElementById("duration");
      const outputBox = document.getElementById("outputBox");
      
      // Load stored time slots from local storage
      const storedTimeSlots = JSON.parse(localStorage.getItem("selectedTimeSlots"));
      if (storedTimeSlots) {
        const storedOptions = Array.from(durationSelect.options).filter(option =>
          storedTimeSlots.includes(option.textContent)
        );
        storedOptions.forEach(option => {
          option.selected = true;
        });
      }
          
      // Add event listener to the duration selection dropdown
durationSelect.addEventListener("change", function() {
  updateSummaryTable();
  const selectedOptions = Array.from(durationSelect.selectedOptions);
  const selectedTimeSlots = selectedOptions.map(option => option.textContent);

  if (selectedTimeSlots.length === 1) {
    outputBox.textContent = `Selected time slot: ${selectedTimeSlots[0]}`;
  } else if (areConsecutive(selectedTimeSlots)) {
    const outputMessage = selectedTimeSlots.join(" and ");
    outputBox.textContent = `Selected time slot(s): ${outputMessage}`;
  } else {
    outputBox.textContent = "You are not allowed to select individual time slots that are not consecutive.";
  }

  // Store selected time slots in local storage
  localStorage.setItem("selectedTimeSlots", JSON.stringify(selectedTimeSlots));
});

// Function to check if time slots are consecutive
function areConsecutive(timeSlots) {
  if (timeSlots.length < 2) {
    return true;
  }

  const sortedTimeSlots = timeSlots.map(slot => parseInt(slot.split(" - ")[0].split(".")[0])).sort((a, b) => a - b);

  for (let i = 1; i < sortedTimeSlots.length; i++) {
    if (sortedTimeSlots[i] - sortedTimeSlots[i - 1] !== 1) {
      return false;
    }
  }
  return true;
}



//Summary table


          function updateSummaryTable() {
            const summaryTable = document.getElementById("summary-table");
            const selectedTimeSlots = JSON.parse(localStorage.getItem("selectedTimeSlots"));
            const guestCounts = JSON.parse(localStorage.getItem("guestCounts"));

            if (!selectedTimeSlots || !guestCounts) {
              return; // No data to update the summary table
            }

            const charges = calculateCharges(selectedTimeSlots, guestCounts);
            const totalAmount = Object.values(charges).reduce((total, charge) => total + charge, 0);

            // Clear the existing table content
            summaryTable.innerHTML = "";

            // Create table rows and cells using createElement
            const rows = [
              ["Date:", localStorage.getItem("selectedDate")],
              ["Time:", selectedTimeSlots.join(" to ")],
              ["Duration:", `${selectedTimeSlots.length} hrs`],
              ["Tickets", "Charges"]
            ];

            for (const guestType in guestCounts) {
              if (guestCounts[guestType] > 0 || guestType === "Infant") {
                const guestLabel = guestType === "Infant" ? "Infant" : `${guestCounts[guestType]} ${guestType}`;
                const chargeLabel = guestCounts[guestType] === 0 ? "Free" : `$${charges[guestType]}`;
                rows.push([guestLabel, chargeLabel]);
              }
            }

            rows.push(["Total Payable", `$${totalAmount}`]);

            rows.forEach(rowData => {
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


            //Converting the rowas of the table to a JSON string
            const summaryData = JSON.stringify(rows);

            // Store the summary data in local storage
            localStorage.setItem("summaryData", summaryData);


          }

          // Calculate charges for each guest type based on duration and counts
          function calculateCharges(selectedTimeSlots, guestCounts) {
            const charges = {
                "Foreigner Adult": 0,
                "Foreigner Child": 0,
                "SL Adult": 0,
                "SL Child": 0,
                "Infant":0
            };

            const normalHourRate = {
                "Foreigner Adult": 10,
                "Foreigner Child": 5,
                "SL Adult": 4,
                "SL Child": 2,
                "Infant":0
            };

            const peakHourRate = {
                "Foreigner Adult": 13,
                "Foreigner Child": 8,
                "SL Adult": 6,
                "SL Child": 3,
                "Infant":0
            };

            const peakHourRanges = [
                { start: 10, end: 13 }, // 10 am to 1 pm
                { start: 15, end: 18 }  // 3 pm to 6 pm
            ];


            selectedTimeSlots.forEach(duration => {
                const [startTime, endTime] = duration.split("-");
                const hour = parseInt(startTime.split(":")[0]); // Extract the hour part

                const isPeakHour = peakHourRanges.some(range => {
                    return hour >= range.start && hour < range.end;
                });


                for (const guestType in guestCounts) {
                    if (guestCounts[guestType] > 0) {
                        charges[guestType] +=
                            guestCounts[guestType] * (isPeakHour ? peakHourRate[guestType] : normalHourRate[guestType]);
                    }
                }
            });

            return charges;
          }

          // Call the updateSummaryTable function whenever there's a change
          document.getElementById("calendar").addEventListener("click", updateSummaryTable);
          document.querySelectorAll(".box-container").forEach(box => {
            const input = box.querySelector("input");
            box.querySelector(".up").addEventListener("click", updateSummaryTable);
            box.querySelector(".down").addEventListener("click", updateSummaryTable);
            input.addEventListener("input", updateSummaryTable);
          });
          document.getElementById("duration").addEventListener("change", updateSummaryTable);

          // Load guest counts from local storage and update summary table
          loadGuestCountsFromLocalStorage();
          updateSummaryTable();

//continue to purchase btn
        document.addEventListener("DOMContentLoaded", function() {
        

          // Get the "Continue with Purchase" button
          const continueBtn = document.querySelector(".lastbtn .btn");

          // Initially, disable the button
          continueBtn.disabled = true;

          // Function to check if all required information is filled
          function isAllInfoFilled() {
              // Check if selected date, time slots, and guest counts are filled
              const selectedDate = localStorage.getItem("selectedDate");
              const selectedTimeSlots = JSON.parse(localStorage.getItem("selectedTimeSlots"));
              const guestCounts = JSON.parse(localStorage.getItem("guestCounts"));

              return selectedDate && selectedTimeSlots && guestCounts && Object.values(guestCounts).some(count => count > 0);
          }

          // Enable the "Continue with Purchase" button if all required information is filled
          function updateContinueButtonStatus() {
              continueBtn.disabled = !isAllInfoFilled();
          }

          // Add event listener to the "Continue with Purchase" button
          continueBtn.addEventListener("click", function() {
              // Redirect to the "Details" page
              window.location.href = "./Details.html";
          });

          // Load stored guest counts and update summary table
          loadGuestCountsFromLocalStorage();
          updateSummaryTable();
          // Update the "Continue with Purchase" button status whenever there's a change
          document.getElementById("calendar").addEventListener("click", updateContinueButtonStatus);
          document.querySelectorAll(".box-container").forEach(box => {
              const input = box.querySelector("input");
              box.querySelector(".up").addEventListener("click", updateContinueButtonStatus);
              box.querySelector(".down").addEventListener("click", updateContinueButtonStatus);
              input.addEventListener("input", updateContinueButtonStatus);
          });
          document.getElementById("duration").addEventListener("change", updateContinueButtonStatus);
        });