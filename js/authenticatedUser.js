// Function to check if the user is logged in
function isLoggedIn() {
  const accessToken = getCookie("access_token");
  return !!accessToken; // Return true if the access token is present, otherwise false
}

// Function to retrieve a cookie value by name (similar to the one used in login.js)
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

// Check if the user is logged in
if (isLoggedIn()) {
  setLoggedInState();
  removeHiddenElements();
  console.log("User is logged in.");
} else {
  console.log("User is not logged in.");
}

function setLoggedInState() {
  const loginLinks = document.querySelectorAll(".login-link");

  loginLinks.forEach((link) => {
    link.textContent = "خروج";
    link.href = "index.html";
    link.addEventListener("click", () => {
      logout();
    });
  });
}

function logout() {
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect the user to the index page (you can customize the URL)
  window.location.href = "index.html";
}

// Function to remove elements with the "hide" class
function removeHiddenElements() {
  // Select all elements with the "hide" class
  const hiddenElements = document.querySelectorAll(".hide");

  // Remove each hidden element from the DOM
  hiddenElements.forEach((element) => {
    element.classList.remove("hide");
  });
}
