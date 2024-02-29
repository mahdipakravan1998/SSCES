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
  const apiUrl = `http://ssces.ir:8000/events/events/${eventId}/`;

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

function getAccessToken() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "access_token") {
      return value;
    }
  }
  return null;
}

// Function to make a POST request to the registered event API
function registerEvent(eventId, phoneNumber, isAnonymous) {
  return new Promise((resolve, reject) => {
    const apiUrl = isAnonymous
      ? "http://ssces-fum.ir/events/anonymous_registered_event/"
      : "http://ssces.ir:8000/events/registered_event/";

    const requestData = {
      event: eventId,
      phone_number: phoneNumber,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // If the user is authenticated, include the access token in the headers
    if (!isAnonymous) {
      const accessToken = getAccessToken();
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          removeDuplicateRegistrationStyle();
        } else {
          throw new Error("Failed to register for the event");
        }
      })
      .then((data) => {
        // Store the 'id' value from the response data for later use
        const registrationId = data.id;

        resolve({ registrationId });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

// Function to validate the phone number using a regular expression
function validatePhoneNumber(phoneNumber) {
  const regex = /^(\+98|0)?9\d{9}$/;
  return regex.test(phoneNumber);
}

// Function to remove the style of the 'invalid-phone' element
function removeInvalidPhoneStyle() {
  const invalidPhoneElement = document.getElementById("invalid-phone");
  invalidPhoneElement.removeAttribute("style");
}

function hideInvalidPhoneElement() {
  const invalidPhoneElement = document.getElementById("invalid-phone");
  invalidPhoneElement.setAttribute("style", "display: none;");
}

function removeDuplicateRegistrationStyle() {
  const invalidPhoneElement = document.getElementById("duplicate-registration");
  invalidPhoneElement.removeAttribute("style");
}

function hideDuplicateRegistrationElement() {
  const invalidPhoneElement = document.getElementById("duplicate-registration");
  invalidPhoneElement.setAttribute("style", "display: none;");
}

// New function to check user registration status and update UI accordingly
async function checkUserRegistrationStatus(eventId) {
  const apiUrl = "http://ssces.ir:8000/events/registered_event/";

  try {
    const accessToken = getAccessToken();
    const headers = {
      "Content-Type": "application/json",
    };

    // If the user is authenticated, include the access token in the headers
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();

      // Check if the user is registered for the event
      const registeredEvent = data.results.find(
        (result) => result.event.id === eventId
      );

      if (registeredEvent) {
        if (registeredEvent.is_paid) {
          // User has registered and paid, hide registration button and show success message
          document.getElementById("register-button").style.display = "none";
          document.querySelector(".success-msg").removeAttribute("style");
        } else {
          // User has registered but not paid, disable phone input and change button text
          document.getElementById("phone-input").value =
            registeredEvent.phone_number;
          document.getElementById("phone-input").readOnly = true;
          document.getElementById("payment-button").textContent = "پرداخت";
        }
        return registeredEvent;
      }
    } else {
      console.error("Failed to fetch user registration status");
    }
  } catch (error) {
    console.error("Error checking user registration status:", error);
  }
}

async function getRegistrationId(eventId) {
  const apiUrl = `http://ssces.ir:8000/events/registered_event/`;

  try {
    const accessToken = getAccessToken();
    const headers = {
      "Content-Type": "application/json",
    };

    // If the user is authenticated, include the access token in the headers
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();

      const result = data.results.find((result) => result.event.id === eventId);

      if (result) {
        return result.id;
      } else {
        console.error("Event not found in user registrations");
        return null;
      }
    } else {
      console.error("Failed to fetch user registration status");
    }
  } catch (error) {
    console.error("Error checking user registration status:", error);
  }
}

// Call the function to check user registration status
const eventId = getEventIdFromUrl();
if (eventId && getAccessToken()) {
  checkUserRegistrationStatus(eventId);
}

// Modified event listener for the registration button click
const registrationButton = document.getElementById("payment-button");
registrationButton.addEventListener("click", async function (event) {
  event.preventDefault(); // Prevent the default form submission
  hideInvalidPhoneElement();
  hideDuplicateRegistrationElement();

  const phoneNumberInput = document.getElementById("phone-input");
  const phoneNumber = phoneNumberInput.value;

  // Check if the phone number is valid
  if (validatePhoneNumber(phoneNumber)) {
    const eventId = getEventIdFromUrl();

    // Determine if the user is authenticated
    const isUserAuthenticated = getAccessToken();

    if (isUserAuthenticated) {
      // Check if the user is already registered
      const isUserRegistered = await checkUserRegistrationStatus(eventId);

      if (isUserRegistered) {
        // User is already registered, redirect to payment page
        const registrationId = await getRegistrationId(eventId);
        redirectToPaymentPage(registrationId, eventId, phoneNumber, false);
      } else {
        // User is not registered, proceed with registration for authenticated user
        try {
          const { registrationId } = await registerEvent(
            eventId,
            phoneNumber,
            false
          );
          // Registration successful, redirect to payment page
          redirectToPaymentPage(registrationId, eventId, phoneNumber, false);
        } catch (error) {
          // Handle registration error
          console.error("Error registering for the event:", error);
        }
      }
    } else {
      // User is anonymous, proceed with registration for anonymous user
      try {
        const { registrationId } = await registerEvent(
          eventId,
          phoneNumber,
          true
        );
        // Registration successful, redirect to payment page
        redirectToPaymentPage(registrationId, eventId, phoneNumber, true);
      } catch (error) {
        // Handle registration error
        console.error("Error registering for the event:", error);
      }
    }
  } else {
    removeInvalidPhoneStyle(); // Remove the invalid phone style
  }
});

// This function is written for demo. It is necessary to edit this function after getting the payment gateway and write the corresponding function
// Modified redirectToPaymentPage function
function redirectToPaymentPage(
  registrationId,
  eventId,
  phoneNumber,
  isAnonymous
) {
  // Get access token if isAnonymous is false
  const accessToken = isAnonymous ? "" : getAccessToken();

  // Create an object with all parameters
  const params = {
    registrationID: registrationId,
    eventID: eventId,
    phoneNumber: phoneNumber,
    isAnonymous: isAnonymous,
    accessToken: accessToken,
  };

  // Convert the parameters to a JSON string
  const jsonString = JSON.stringify(params);

  // Compress and encode the JSON string with base64
  const compressedBase64 = btoa(unescape(encodeURIComponent(jsonString)));

  // Add the compressed and encoded parameters as a token parameter in the URL
  const paymentUrl = `/payment.html?token=${compressedBase64}`;

  // Set the window location
  window.location.href = paymentUrl;
}

function handleSuccess() {
  const toast = document.querySelector(".toast");
  const closeIcon = document.querySelector(".success-close");
  const progress = document.querySelector(".success-progress");

  let timer1, timer2;

  toast.classList.add("active");
  progress.classList.add("active");

  timer1 = setTimeout(() => {
    toast.classList.remove("active");
  }, 5000); //1s = 1000 milliseconds

  timer2 = setTimeout(() => {
    progress.classList.remove("active");
  }, 5300);

  closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");

    setTimeout(() => {
      progress.classList.remove("active");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
  });
}

// Function to get the value of a parameter from the URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Check if the status parameter is equal to "success" in the URL
window.onload = function () {
  var statusValue = getParameterByName("status");
  if (statusValue === "success") {
    handleSuccess();
  }
};
