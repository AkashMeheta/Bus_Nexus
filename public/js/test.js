// Custom function to generate bus results in one-hour intervals
function generateBusResults(startLocation, destination, date) {
  const searchResults = [];
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);

  for (let hour = currentHour; hour < 24; hour++) {
      // Adjust time format to include AM or PM
      const timeFormat = (hour < 12) ? 'AM' : 'PM';
      const formattedHour = (hour === 0) ? 12 : (hour > 12) ? hour - 12 : hour;

      // Generate a random minute within the hour
      const randomMinute = Math.floor(Math.random() * 60);
      const busTime = `${formattedHour}:${String(randomMinute).padStart(2, '0')} ${timeFormat}`;
      const fare = generateRandomFare(10, 100);

      // Create a bus result object
      const result = {
          startLocation: startLocation,
          destination: destination,
          date: date,
          busTime: busTime,
          fare: fare,
      };

      searchResults.push(result);
  }

  return searchResults;
}

//spare Book bus function don't det maybe required later for ref
function bookBus(index) {
  const searchResults = JSON.parse(localStorage.getItem('searchResults'));

  if (!searchResults || index < 0 || index >= searchResults.length) {
    alert('Bus not found.');
  } else {
    // Retrieve the selected bus without modifying time and fare
    const selectedBus = Object.assign({}, searchResults[index]);

    // Store the selected bus in local storage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(selectedBus);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Redirect to the My Bookings Page
    window.location.href = 'My_Bookings.html';
  }
}

const feedbackPlace = document.getElementById("feedback_place");
  feedbackPlace.innerHTML = `Feedback: ${text}`;
