// My Bookings Page

// Function to cancel a booking and update the wallet balance
function cancelBooking(index) {
  const myBookings = JSON.parse(localStorage.getItem('bookings'));

  if (myBookings && index >= 0 && index < myBookings.length) {
    const canceledBooking = myBookings[index];
    const canceledBookingFare = canceledBooking.fare;

    // Update the wallet balance (increment by the canceled booking's fare)
    const currentBalance = parseInt(localStorage.getItem('balance'));
    const updatedBalance = currentBalance + canceledBookingFare;
    localStorage.setItem('balance', updatedBalance);

    //Update admin Bank Balance
    const adminBank = JSON.parse(localStorage.getItem('adminBankBalance'));
    adminBankBalance = adminBank - canceledBookingFare;
    localStorage.setItem('adminBankBalance', JSON.stringify(adminBankBalance));

    //update booking count in admin panel
    const bookingCount = JSON.parse(localStorage.getItem('bookingCount'));
    const livebookingCount = bookingCount - 1;
    localStorage.setItem('bookingCount', JSON.stringify(livebookingCount));

    // Remove the canceled booking from the list
    myBookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(myBookings));

    // Refresh the "My Bookings" page to display the updated list
    location.reload();
  }
}

//Display Bookings 
function displayMyBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings'));
    
    if (!bookings || bookings.length === 0) {
      document.getElementById('myBookings').textContent = 'You have no bookings.';
    } else {
      const bookingsContainer = document.getElementById('myBookings');
      bookingsContainer.innerHTML = '<h2>My Bookings</h2>';
    
        bookings.forEach((booking, index) => {
          const bookingElement = document.createElement('div');
          bookingElement.className = "result_div";
          bookingElement.innerHTML = `
            <p>Booking ${index + 1}</p>
            <p>Start Location: ${booking.startLocation}</p>
            <p>Destination: ${booking.destination}</p>
            <p>Date: ${booking.date}</p>
            <p>Bus Time: ${booking.busTime}</p>
            <p>Fare: Rs ${booking.fare}</p>
            <p id="feedback_place">Feedback:  ${booking.feedback !== undefined ? booking.feedback : 'Give some feedback'}</p>
            <button class="secondary-button" onclick="cancelBooking(${index})">Cancel Booking</button>
            <button class="secondary-button" onclick="printTicket(${index})">Print Ticket</button>
            <button class="secondary-button" onclick="feedbackPopup(${index})">FeedBack</button>
          `;
          bookingsContainer.appendChild(bookingElement);
        });
      }
      //localStorage.clear();
    }

//Function for Feedback

function feedback(){
  //get and store feedback
  const feedbackText = document.getElementById("feedback_text");
  const text = feedbackText.value;
  localStorage.setItem('feedback', JSON.stringify(text));
  
  //object
  const pushObject = {
    feedbacks: text,
  };

  //fetch index and bookings
  const desireDiv = JSON.parse(localStorage.getItem('bookings'));
  const index = JSON.parse(localStorage.getItem('feedbackIndex'));
  desireDiv[index].feedback=`${text}`;
  localStorage.setItem('bookings', JSON.stringify(desireDiv));
  
  location.reload();
}    

function feedbackPopup(index){
  const feedbackForm = document.getElementById('feedback_form');
  feedbackForm.style.display = 'block';
  console.log(index);
  localStorage.setItem('feedbackIndex', index);
}


// Function to print a ticket for a booking
function printNow(index) {

    //creating new window as ticket
    const printWindow = window.open('', '_blank');

    const selectedBus = JSON.parse(localStorage.getItem('bookings'));
    const printBus = selectedBus[index];

    const printContent= `
        <html>
        <head>
          <title>Bus Ticket</title>
          <style>
          /* Add CSS styles and class names as needed */
          .result_div{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                padding-bottom: 1vh;
                padding-top: 1vh;
                border: 1.7px solid black;
                margin-bottom: 2vh;
                background: linear-gradient(90deg, rgba(255,255,185,1) 0%, rgba(246,247,74,1) 35%, rgba(0,222,186,1) 100%);
            }

            .result_div p {
                font-weight: 700 !important;
                font-size: 20px;
            }
        </style>
        </head>
        <body>
        <h2>Bus Ticket</h2>
          <div class="popup-content main-content container result_div">
              <p>Start Location: ${printBus.startLocation}</p>
              <p>Destination: ${printBus.destination}</p>
              <p>Date: ${printBus.date}</p>
              <p>Bus Time: ${printBus.busTime}</p>
              <p>Fare: Rs ${printBus.fare}</p>
          </div> 
          <!-- Additional ticket information here -->
        </body>
        </html>
      `;

    // Write the ticket content to the new window
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Trigger the print functionality for the new window
    printWindow.print();
    printWindow.close();
}

 //Print ticket pop up
 function printTicket(index){
  const paymentPopup = document.getElementById('paymentPopup');
  paymentPopup.style.display = 'block';

  const selectedBus = JSON.parse(localStorage.getItem('bookings'));
  const printBus = selectedBus[index];

  const printContent = document.getElementById("print-content");
  printContent.innerHTML= `
        <p>Booking ${index + 1}</p>
        <p>Start Location: ${printBus.startLocation}</p>
        <p>Destination: ${printBus.destination}</p>
        <p>Date: ${printBus.date}</p>
        <p>Bus Time: ${printBus.busTime}</p>
        <p>Fare: Rs ${printBus.fare}</p>
        <button class="secondary-button" onclick="printNow(${index})">Print Now</button>
        <button class="secondary-button" onclick="location.reload()">Back</button>
        `;
}