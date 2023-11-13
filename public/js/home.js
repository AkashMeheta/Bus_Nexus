function specialBus(){
    const specialBusList = JSON.parse(localStorage.getItem('specialBusList'));
    const busList = document.getElementById('bus-list');
    if(specialBusList== null){
        return;
    }else{
        busList.innerHTML = '';

      specialBusList.forEach((bus, index) => {
          const newRow = busList.insertRow();
          newRow.innerHTML = `
              <td>${index + 1}</td>
              <td>${bus.startLocation}</td>
              <td>${bus.destination}</td>
              <td>${bus.date}</td>
              <td>${bus.time}</td>
              <td>${bus.fare}</td>
              <td><button class="secondary-button" onclick="bookSpecialBus(${index})">Book Bus</button></td>
          `;
      });
    }

}

//book bus
function bookSpecialBus(index) {
    const searchResults = JSON.parse(localStorage.getItem('specialBusList'));
  
    if (!searchResults || index < 0 || index >= searchResults.length) {
      alert('Bus not found.');
    } else {
      // Retrieve the selected bus without modifying time and fare
      const selectedBus = Object.assign({}, searchResults[index]);
  
      //fare amount
      const fareAmount = selectedBus.fare;
      console.log(fareAmount);
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
  
        // Store the selected bus index in localStorage for later retrieval after payment
        localStorage.setItem('selectedBusIndex', index);
    }
  }//