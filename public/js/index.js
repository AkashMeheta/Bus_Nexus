//HOme PAge Js
let Balance = 1000; // Wallet
let paymentAmount; //Booked BUs Fare Amount

// Check if the wallet balance is already in local storage, if not, initialize it to 1000
if (localStorage.getItem('balance') === null) {
  localStorage.setItem('balance', 1000);
}


function searchBus() {
  const startLocation = document.getElementById('startLocation').value;
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;
  const count = document.getElementById('count').value;
  // EXTRA JS
  const BusList = JSON.parse(localStorage.getItem('specialBusList')) || [];
  const search = JSON.parse(localStorage.getItem('searchResults')) || [];
  search.push(BusList);
  localStorage.setItem('searchResults', JSON.stringify(search));
  // EXTRA JS


  if (!startLocation || !destination || !date) {
    alert('Please fill in all fields.');
    return;
  }

  // Generate bus results in one-hour intervals starting from the user's search time
  const searchResults = generateBusResults(startLocation, destination, date, count);

  if (searchResults.length === 0) {
    alert('No buses found for your search criteria.');
  } else {
    // Store search results in local storage for later retrieval on the Search Results Page
    localStorage.setItem('searchResults', JSON.stringify(searchResults));

    // Redirect to the Search Results Page
    window.location.href = 'Search_Page.html';
  }
}

// Custom function to generate bus results based on the selected date
function generateBusResults(startLocation, destination, date, count) {
  const searchResults = [];
  const currentDateTime = new Date();
  const selectedDate = new Date(date);

  for (let hour = 0; hour < 24; hour++) {
    if (selectedDate > currentDateTime) {
      // For future dates, show results for all 24 hours with random minutes
      const randomMinute = Math.floor(Math.random() * 60);
      const bustime = `${String(hour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}`;
      const fare = generateRandomFare(10, 100);
      
      // Create a bus result object
      const result = {
        startLocation: startLocation,
        destination: destination,
        date: date,
        bustime: bustime,
        fare: fare,
        count:count,
      };

      searchResults.push(result);
    } else if (selectedDate.getDate() === currentDateTime.getDate()) {
      // For today's date, show results from the current time to 24 hours
      if (hour >= currentDateTime.getHours()) {
        const randomMinute = Math.floor(Math.random() * 60);
        const bustime = `${String(hour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}`;
        const fare = generateRandomFare(10, 100);
       
        // Create a bus result object
        const result = {
          startLocation: startLocation,
          destination: destination,
          date: date,
          bustime: bustime,
          fare: fare,
          count:count,
        };

        searchResults.push(result);
      }
    }
  }

  return searchResults;
}

// Function to generate random fare within a given range
function generateRandomFare(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Wallet Handeling
function walletBalance(){
  const showBalance = JSON.parse(localStorage.getItem('balance'));
  const walletDiv = document.getElementById("wallet");
  walletDiv.innerText = `Balance ${showBalance}`;
  localStorage.setItem('balance', JSON.stringify(showBalance));
} //
