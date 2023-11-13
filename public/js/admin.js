//storing Some local Storage values
if (localStorage.getItem('adminBankBalance') === null) {
  localStorage.setItem('adminBankBalance', 0);
}
if (localStorage.getItem('bookingCount') === null) {
  localStorage.setItem('bookingCount', 0);
}


//update user Count
const countElement = document.getElementById('userCount');

fetch('/documentCount')
  .then(response => response.json())
  .then(data => {
    const { count } = data;
    countElement.textContent = `${count}`;
  })
  .catch(error => {
    console.error('Error:', error);
    countElement.textContent = 'Error fetching document count';
  });


//window load func for update balance and bookings count
function Count(){
  //update Balance
  const adminBankBalance = JSON.parse(localStorage.getItem('adminBankBalance'));
  const amountCount = document.getElementById('amountCount');
  amountCount.innerText = `Rs. ${adminBankBalance}`;

  //update bookings count
  const bookingCount = JSON.parse(localStorage.getItem('bookingCount'));
  const bookingsCount = document.getElementById('bookingsCount');
  bookingsCount.innerText = bookingCount;
}

//user pop up
function addUserButton(){
  const addUserpopup = document.getElementById('pop');
  addUserpopup.style.display = 'block';
}

//add bus popup
function addBusButton(){
  const addBuspopup = document.getElementById('add-bus-pop');
  addBuspopup.style.display = 'block';
}

//add user logic
document.addEventListener('DOMContentLoaded', function () {
  const busForm = document.getElementById('bus-form');
  const busTable = document.getElementById('bus-table');
  const busList = document.getElementById('bus-list');
  
  let specialBusList = getSpecialBusListFromLocalStorage();

  function getSpecialBusListFromLocalStorage() {
      const storedList = localStorage.getItem('specialBusList');
      return storedList ? JSON.parse(storedList) : [];
  }

  function saveSpecialBusListToLocalStorage() {
      localStorage.setItem('specialBusList', JSON.stringify(specialBusList));
  }

  function refreshTable() {
      busList.innerHTML = '';

      specialBusList.forEach((bus, index) => {
          const newRow = busList.insertRow();
          newRow.innerHTML = `
              <td>${index + 1}</td>
              <td>${bus.startLocation}</td>
              <td>${bus.destination}</td>
              <td>${bus.date}</td>
              <td>${bus.bustime}</td>
              <td>${bus.fare}</td>
              <td><button class="cancel-button secondary-button" data-index="${index}">Cancel</button></td>
          `;
      });

      const cancelButtons = document.querySelectorAll('.cancel-button');
      cancelButtons.forEach(function (button) {
          button.addEventListener('click', function () {
              const index = parseInt(button.getAttribute('data-index'));
              specialBusList.splice(index, 1);
              saveSpecialBusListToLocalStorage();
              refreshTable();
          });
      });
  }

  refreshTable();

  busForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const startLocation = document.getElementById('startLocation').value;
      const destination = document.getElementById('destination').value;
      const date = document.getElementById('date').value;
      const bustime = document.getElementById('time').value;
      const fare = document.getElementById('fare').value;

      const newBus = {
          startLocation,
          destination,
          date,
          bustime,
          fare
      };

      specialBusList.push(newBus);
      saveSpecialBusListToLocalStorage();
      refreshTable();
      busForm.reset();
  });
    
  // const search = JSON.parse(localStorage.getItem('searchResults')) || [];
  // const BusList = JSON.parse(localStorage.getItem('specialBusList')) || [];

  // //Prepend 'specialBusList' to 'searchResults'
  // search.push(...BusList);

  // // Save the updated 'searchResults' back to local storage
  // localStorage.setItem('searchResults', JSON.stringify(search));
});


//popup close button
function closePopup1() {
  document.getElementById('add-bus-pop').style.display = 'none';
}
function closePopup2() {
  document.getElementById('pop').style.display = 'none';
}