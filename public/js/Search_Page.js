// Search Results Page

//display Search Result
function displaySearchResults() {
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));
    
    if (!searchResults || searchResults.length === 0) {
      document.getElementById('searchResults').textContent = 'No search results found.';
    } else {
      // Sort the search results in ascending order of bus time
      searchResults.sort((a, b) => {
        return getTimeInMinutes(a.bustime) - getTimeInMinutes(b.bustime);
      });
  
      const resultsContainer = document.getElementById('searchResults');
      
      const search_top = document.createElement('div');
      search_top.className = "result_heading_div";
      search_top.innerHTML = `
          <p>Bus No.</p>
          <p>Start Location</p>
          <p>Destination</p>
          <p>Date</p>
          <p>Bus Time</p>
          <p>Fare</p>
          <p>Button</p>
      `;
      resultsContainer.appendChild(search_top);
      searchResults.forEach((result, index) => {
        const resultElement = document.createElement('div');
        resultElement.className = "result_div";
        
        resultElement.innerHTML = `
          <p>${index + 1}</p>
          <p>${result.startLocation}</p>
          <p>${result.destination}</p>
          <p>${result.date}</p>
          <p>${result.bustime}</p>
          <p>Rs ${result.fare}</p>
          <button class="secondary-button" onclick="bookBus(${index})">Book Bus</button>
        `;
        //console.log(passengerCount);
        resultsContainer.appendChild(resultElement);
      });
      
    }
    //localStorage.clear();
  }

  
//display special bus list
function displaySpecialBusList() {
  const searchResults = JSON.parse(localStorage.getItem('specialBusList'));
  
  if (!searchResults || searchResults.length === 0) {
    document.getElementById('specialBusList').textContent = 'No search results found.';
  } else {
    // // Sort the search results in ascending order of bus time
    // searchResults.sort((a, b) => {
    //   return getTimeInMinutes(a.busTime) - getTimeInMinutes(b.busTime);
    // });

    const resultsContainer = document.getElementById('specialBusList');
    
    const search_top = document.createElement('div');
    search_top.className = "result_heading_div";
    search_top.innerHTML = `
        <p>Bus No.</p>
        <p>Start Location</p>
        <p>Destination</p>
        <p>Date</p>
        <p>Bus Time</p>
        <p>Fare</p>
        <p>count</p>
        <p>Button</p>
    `;
    resultsContainer.appendChild(search_top);
    searchResults.forEach((result, index) => {
      const resultElement = document.createElement('div');
      resultElement.className = "result_div";
      
      resultElement.innerHTML = `
        <p>${index + 1}</p>
        <p>${result.startLocation}</p>
        <p>${result.destination}</p>
        <p>${result.date}</p>
        <p>${result.bustime}</p>
        <p>Rs ${result.fare}</p>
        <p><input type="text" id="SpecialCount" placeholder="Count" style="max-width: 50px;  height: 50px;"/><button class="CountOkButton" onclick="okButton(${index})"style="background-color: #ffbf23; color: balck; cursor: pointer;">ok</button></p>
        <button class="secondary-button" onclick="bookSpecialBus(${index})">Book Bus</button>
      `;
      
      resultsContainer.appendChild(resultElement);
    });
  }

  //localStorage.clear();
}

//count ok button
function okButton(index){
  const count = document.getElementById("SpecialCount").value;
  console.log(count);

  const specialBusList = JSON.parse(localStorage.getItem("specialBusList"));
  specialBusList[index].count=parseInt(count);
  localStorage.setItem('specialBusList', JSON.stringify(specialBusList));
  
  const specialBusList1 = JSON.parse(localStorage.getItem("specialBusList"));
  console.log(specialBusList1);
}


  //book bus
function bookBus(index) {
  const searchResults = JSON.parse(localStorage.getItem('searchResults'));

  if (!searchResults || index < 0 || index >= searchResults.length) {
    alert('Bus not found.');
  } else {
    // Retrieve the selected bus without modifying time and fare
    const selectedBus = Object.assign({}, searchResults[index]);

    //passenger count
    const passengerCount = selectedBus.count;
    console.log(passengerCount);

    //fare amount
    const fareAmount = selectedBus.fare * passengerCount;
    //console.log(fareAmount);
    localStorage.setItem('FareAmount', JSON.stringify(fareAmount));

    // Redirect to the My Bookings Page
    // Show the payment pop-up by toggling the CSS class
      const paymentPopup = document.getElementById('paymentPopup');
      paymentPopup.style.display = 'block';
      
      //show the payment amount
      paymentAmount = JSON.parse(localStorage.getItem('FareAmount'));


      // Display the fare amount on the payment pop-up
      const fareAmountElement = document.getElementById('fareAmount');
      fareAmountElement.textContent = `Pay Now: Rs.${paymentAmount}`;

      
      //paymentPopup.append(passenger);
      // Store the selected bus index in localStorage for later retrieval after payment
      localStorage.setItem('selectedBusIndex', index);
  }
}//

  //book special bus
  function bookSpecialBus(index) {
    const searchResults = JSON.parse(localStorage.getItem('specialBusList'));
  
    if (!searchResults || index < 0 || index >= searchResults.length) {
      alert('Bus not found.');
    } else {
      // Retrieve the selected bus without modifying time and fare
      const selectedBus = Object.assign({}, searchResults[index]);
      
      //passenger count
      const passengerCount = selectedBus.count;
      console.log(passengerCount);

      //fare amount
      const fareAmount = selectedBus.fare * passengerCount;
      console.log(fareAmount);
      const fareAmountNumber = Number(fareAmount);
      localStorage.setItem('FareAmount', JSON.stringify(fareAmountNumber));
  
      // Redirect to the My Bookings Page
      // Show the payment pop-up by toggling the CSS class
        const paymentPopup = document.getElementById('specialPaymentPopup');
        paymentPopup.style.display = 'block';
        
        //show the payment amount
        paymentAmount = JSON.parse(localStorage.getItem('FareAmount'));
  
  
        // Display the fare amount on the payment pop-up
        const fareAmountElement = document.getElementById('SpecialFareAmount');
        fareAmountElement.textContent = `Pay Now: Rs.${paymentAmount}`;
  
        // Store the selected bus index in localStorage for later retrieval after payment
        localStorage.setItem('selectedBusIndex', index);
    }
  }//

  // Function to process payment and add booking
function processPayment() {
  // Retrieve the selected bus index from localStorage
  const index = localStorage.getItem('selectedBusIndex');

  if (index !== null) {
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));

    if (searchResults && index >= 0 && index < searchResults.length) {
      // Get the selected bus
      const selectedBus = searchResults[index];

      // Process the payment 

      // Add the selected bus to My Bookings
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(selectedBus);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Close the payment pop-up
      const paymentPopup = document.getElementById('paymentPopup');
      paymentPopup.style.display = 'none';


      //Update Wallet Balance
      const liveBalance = JSON.parse(localStorage.getItem('balance')); //Store by bookbus();
      const payAmount = JSON.parse(localStorage.getItem('FareAmount'));
      Balance = liveBalance - payAmount;
      localStorage.setItem('balance', JSON.stringify(Balance));

      //update admin locar balance
      const adminBank = JSON.parse(localStorage.getItem('adminBankBalance'));
      adminBankBalance = adminBank + payAmount;
      localStorage.setItem('adminBankBalance', JSON.stringify(adminBankBalance));

      //update Bookings Numbers
      const bookingCount = JSON.parse(localStorage.getItem('bookingCount'));
      const livebookingCount = bookingCount + 1;
      localStorage.setItem('bookingCount', JSON.stringify(livebookingCount));

      // Redirect to My Bookings Page
      window.location.href = 'My_Bookings.html';
    }
  }
} //


// Function to process payment and add booking in special buses
function processPayment2() {
  // Retrieve the selected bus index from localStorage
  const index = localStorage.getItem('selectedBusIndex');

  if (index !== null) {
    const searchResults = JSON.parse(localStorage.getItem('specialBusList'));

    if (searchResults && index >= 0 && index < searchResults.length) {
      // Get the selected bus
      const selectedBus = searchResults[index];

      // Process the payment (you can implement your payment logic here)

      // Add the selected bus to My Bookings
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(selectedBus);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Close the payment pop-up
      const paymentPopup = document.getElementById('paymentPopup');
      paymentPopup.style.display = 'none';


      //Update Wallet Balance
      const liveBalance = JSON.parse(localStorage.getItem('balance')); //Store by bookbus();
      const payAmount = JSON.parse(localStorage.getItem('FareAmount'));
      Balance = liveBalance - payAmount;
      localStorage.setItem('balance', JSON.stringify(Balance));

      //update admin locar balance
      const adminBank = JSON.parse(localStorage.getItem('adminBankBalance'));
      adminBankBalance = adminBank + payAmount;
      localStorage.setItem('adminBankBalance', JSON.stringify(adminBankBalance));

      //update Bookings Numbers
      const bookingCount = JSON.parse(localStorage.getItem('bookingCount'));
      const livebookingCount = bookingCount + 1;
      localStorage.setItem('bookingCount', JSON.stringify(livebookingCount));

      // Redirect to My Bookings Page
      window.location.href = 'My_Bookings.html';
    }
  }
} //

  // Function to convert time to minutes for sorting
  function getTimeInMinutes(time) {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }
  