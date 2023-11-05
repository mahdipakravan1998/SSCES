function getEventIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventId = urlParams.get("eventID");

  // Ensure eventId is a number and not null
  if (!isNaN(eventId) && eventId !== null) {
    return parseInt(eventId, 10); // Parse eventId as an integer
  } else {
    console.error("Invalid event ID in URL.");
    return null;
  }
}

async function fetchEventDetails(eventId) {
  const apiUrl = `https://ssces-fum.ir/events/events/${eventId}/`;

  try {
    const response = await fetch(apiUrl);
    const eventData = await response.json();
    return eventData;
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}

async function populateEventPage() {
  const eventId = getEventIdFromUrl(); // Implement a function to get event ID from URL
  const event = await fetchEventDetails(eventId);

  if (event) {
    const titleElement = document.querySelector(
      ".tourmaster-room-title-item-title"
    );
    const dateElement = document.querySelector(
      ".gdlr-core-column-service-caption.date"
    );
    const authenticatedPriceElement = document.querySelector(
      ".gdlr-core-column-service-caption.authenticated-price"
    );
    const anonymousPriceElement = document.querySelector(
      ".gdlr-core-column-service-caption.anonymous-price"
    );
    const descriptionElement = document.querySelector(".event-description");
    const pageTitle = document.querySelector(".ssces-page-title");
    const poster = document.querySelector(".single-post-image");
    const backgroundPoster = document.querySelector(
      ".custom-event-registration-bg"
    );

    const posterUrl = event.image;

    backgroundPoster.style.cssText += `background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${posterUrl}) !important;`;
    poster.src = posterUrl;
    document.title = event.title;
    pageTitle.textContent = event.title;
    titleElement.textContent = event.title;
    dateElement.textContent = persianDateConverter(event.date);
    authenticatedPriceElement.textContent =
      event.authenticated_user_price + " هزار تومان";
    anonymousPriceElement.textContent =
      event.anonymous_user_price + " هزار تومان";
    descriptionElement.innerHTML = event.description;
  } else {
    console.error("Event details not found.");
  }
}

function getFaFormattedDate(inputDate) {
  const dayMonth = getDateFormat(inputDate, {
    day: "2-digit",
    month: "long",
  });

  const year = getDateFormat(inputDate, {
    year: "numeric",
  });

  return `${dayMonth} ${year}`;
}

function getDateFormat(uDate, option) {
  let date = new Intl.DateTimeFormat("fa-IR", option).format(uDate);
  return date;
}

function persianDateConverter(gregorianDate) {
  const inputDate = new Date(gregorianDate);
  const formattedFaDate = getFaFormattedDate(inputDate);

  return formattedFaDate;
}

// Call the function to populate the page content
populateEventPage();

// Get the elements by their IDs
const registerButton = document.getElementById("register-button");
const phoneInput = document.getElementById("phone-input");
const paymentButton = document.getElementById("payment-button");

// Add a click event listener to the "ثبت نام" button
registerButton.addEventListener("click", function () {
  
    // Show the elements with a fade-in animation
    phoneInput.style.display = "block";
    paymentButton.style.display = "block";
    setTimeout(() => {
      phoneInput.style.opacity = "1";
      paymentButton.style.opacity = "1";
    }, 0); // Use a small delay to trigger the transition

  // Hide the "ثبت نام" button
  registerButton.style.display = "none";
});
