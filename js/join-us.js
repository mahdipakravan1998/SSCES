async function fetchData() {
  const apiUrl = "https://ssces.ir:8000/cooperation/cooperation_forms/";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results; // Return the results array from the API response
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function initializeTabContent(data) {
  const tabTitlesElement = document.getElementById("tabTitles");
  const tabContentsElement = document.getElementById("tabContents");

  tabTitlesElement.innerHTML = "";
  tabContentsElement.innerHTML = "";

  data.forEach((item, index) => {
    const titleElement = document.createElement("div");
    titleElement.className =
      "gdlr-core-tab-item-title" +
      (index === 0 ? " gdlr-core-active active-tab-border" : "");
    titleElement.textContent = item.title;
    titleElement.setAttribute("data-tab-id", item.id);
    tabTitlesElement.appendChild(titleElement);

    const contentElement = document.createElement("div");
    contentElement.className =
      "gdlr-core-tab-item-content" + (index === 0 ? " gdlr-core-active" : "");
    contentElement.setAttribute("data-tab-id", item.id);
    contentElement.innerHTML = `
      <div class="voluntarily-form wpcf7" style="max-width: 760px; margin: auto;">
          <div>
              <p class="voluntarily-form-title">${item.description}</p>
              <div class="voluntarily-form-group-input">
                  <input type="tel" name="PhoneNumber${item.id}" placeholder="تلفن همراه:" class="input PhoneNumber voluntarily-form-input-item"/>
                  <input type="text" name="Email${item.id}" placeholder="ایمیل:" class="input voluntarily-form-input-item"/>
              </div>
              <ul style="display: none;" class="error-list" id="INVALID_INPUT">
                <li style="display: none;" class="error-list-item" id="INVALID_PHONE">
                  <i
                    class="fa fa-exclamation-circle error-icon"
                  ></i>
                  <p class="error-text">
                    شماره تلفن وارد شده معتبر نیست. (مثال:
                    +989123456789 یا 09123456789)
                  </p>
                </li>
                <li style="display: none;" class="error-list-item" id="INVALID_EMAIL">
                  <i
                    class="fa fa-exclamation-circle error-icon"
                  ></i>
                  <p class="error-text">
                    ایمیل وارد شده معتبر نیست. (مثال:
                    example@email.com)
                  </p>
                </li>
              </ul>
              <textarea name="Message${item.id}" placeholder="لطفاً علاقه‌مندی‌های داوطلبانه و تجربیات مرتبط خود را شرح دهید" class="input"></textarea>
              <input type="submit" name="submit${item.id}" value="ثبت" class="submit-button" />
          </div>
      </div>
  `;
    tabContentsElement.appendChild(contentElement);
  });
}

async function populateContent() {
  const data = await fetchData();
  initializeTabContent(data);
  fetchDataAndUpdateForms();
}

window.addEventListener("load", populateContent);

document.addEventListener("DOMContentLoaded", function () {
  // Hide all content items except the active one
  var tabContentItems = document.querySelectorAll(
    "#tabContents .gdlr-core-tab-item-content:not(.gdlr-core-active)"
  );
  tabContentItems.forEach(function (item) {
    item.style.display = "none";
  });

  // Handle title clicks using event delegation
  document
    .getElementById("tabTitles")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("gdlr-core-tab-item-title")) {
        // Remove active class from all titles
        var tabTitles = document.querySelectorAll(
          "#tabTitles .gdlr-core-tab-item-title"
        );
        tabTitles.forEach(function (title) {
          title.classList.remove("gdlr-core-active", "active-tab-border");
        });

        // Add active class to the clicked title and apply the style class
        event.target.classList.add("gdlr-core-active", "active-tab-border");

        // Get the data-tab-id of the clicked title
        var tabId = event.target.getAttribute("data-tab-id");

        // Hide all content items except the one with the corresponding tabId
        var allTabContentItems = document.querySelectorAll(
          "#tabContents .gdlr-core-tab-item-content"
        );
        allTabContentItems.forEach(function (item) {
          item.style.display = "none";
        });

        var selectedTabContent = document.querySelector(
          "#tabContents .gdlr-core-tab-item-content[data-tab-id='" +
            tabId +
            "']"
        );
        if (selectedTabContent) {
          selectedTabContent.style.display = "block";
        }
      }
    });
});

// Function to replace form content with success message
function replaceFormWithSuccess(formId) {
  const formElement = document.querySelector(
    `[data-tab-id="${formId}"] .voluntarily-form`
  );
  if (formElement) {
    formElement.innerHTML = `
        <div class="success-msg">
          <i class="fa fa-check"></i>
          <p class="success-msg-text">
            از وقتی که گذاشتید سپاسگزاریم! پاسخ شما دریافت شد و در حال پردازش است.
          </p>
        </div>`;
  }
}

// Function to fetch API data and update forms
async function fetchDataAndUpdateForms() {
  try {
    // Make a GET request to the API
    const response = await fetch(
      "https://ssces.ir:8000/cooperation/cooperation_replies/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`, // Get the access token from the cookie
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    // Parse the JSON response
    const data = await response.json();

    // Create an object to store form numbers based on cooperation values
    const formNumbers = {};

    // Iterate through API responses and collect unique cooperation values
    data.results.forEach((response) => {
      const cooperationValue = response.cooperation;
      // Replace the form content with a success message
      replaceFormWithSuccess(cooperationValue);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function setInvalidInput(inputElement, placeholderText) {
  inputElement.setAttribute("style", "border: 2px solid red !important;");
  inputElement.placeholder = placeholderText;
}

function clearInvalidInput(inputElement) {
  inputElement.setAttribute("style", "");
}

function hideError(inputElement) {
  inputElement.setAttribute("style", "display: none;");
}

// Function to validate the phone number using a regular expression
function validatePhoneNumber(phoneNumber) {
  const regex = /^(\+98|0)?9\d{9}$/;
  return regex.test(phoneNumber);
}

// Function to validate the email using a regular expression
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
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

  setTimeout(function () {
    location.reload();
  }, 6000);
}

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target.closest(".voluntarily-form");
  const activeTitleElement = document.querySelector(
    ".gdlr-core-tab-item-title.gdlr-core-active"
  );

  const id = activeTitleElement.getAttribute("data-tab-id");
  const phoneNumberInput = form.querySelector('input[name^="PhoneNumber"]');
  const emailInput = form.querySelector('input[name^="Email"]');
  const messageInput = form.querySelector("textarea");
  const invalidErrorElement = form.querySelector("#INVALID_INPUT");
  const invalidPhoneElement = form.querySelector("#INVALID_PHONE");
  const invalidEmailElement = form.querySelector("#INVALID_EMAIL");

  const phoneNumber = phoneNumberInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!phoneNumber) {
    setInvalidInput(phoneNumberInput, "لطفاً تلفن همراه را وارد کنید");
  } else {
    clearInvalidInput(phoneNumberInput);
  }

  if (!email) {
    setInvalidInput(emailInput, "لطفاً ایمیل را وارد کنید");
  } else {
    clearInvalidInput(emailInput);
  }

  if (!message) {
    setInvalidInput(messageInput, "لطفاً پیام خود را وارد کنید");
  } else {
    clearInvalidInput(messageInput);
  }

  // Validate phone number
  if (!validatePhoneNumber(phoneNumber)) {
    invalidErrorElement.removeAttribute("style");
    invalidPhoneElement.removeAttribute("style");
  } else if (!invalidPhoneElement.getAttribute("style")) {
    hideError(invalidPhoneElement);
  }

  // Validate email
  if (!validateEmail(email)) {
    if (!invalidErrorElement.getAttribute("style")) {
      invalidEmailElement.removeAttribute("style");
    } else {
      invalidErrorElement.removeAttribute("style");
      invalidEmailElement.removeAttribute("style");
    }
  } else if (!invalidEmailElement.getAttribute("style")) {
    hideError(invalidEmailElement);
  }

  if (
    !phoneNumber ||
    !email ||
    !message ||
    !validatePhoneNumber(phoneNumber) ||
    !validateEmail(email)
  ) {
    return;
  }

  if (!invalidErrorElement.getAttribute("style")) {
    hideError(invalidErrorElement);
  }

  // Prepare the data to be sent to the server
  const data = {
    cooperation: id,
    text: message,
    phone_number: phoneNumber,
    email: email,
  };

  try {
    const response = await fetch(
      "https://ssces.ir:8000/cooperation/cooperation_replies/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`, // Get the access token from the cookie
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (response.status === 201) {
      handleSuccess();
    } else if (response.status === 500) {
      console.error("Error sending data to server:", result);
      // Handle other error cases
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}

document.addEventListener("click", (event) => {
  const submitButton = event.target.closest(".submit-button");
  if (submitButton) {
    handleSubmit(event);
  }
});

// Function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
