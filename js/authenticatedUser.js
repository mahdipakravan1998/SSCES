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

function setTokens(access, refresh) {
  document.cookie = `access_token=${access}; Secure;`;
  document.cookie = `refresh_token=${refresh}; Secure;`;
}

async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch("https://ssces-fum.ir/users/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    return data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

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

function getRefreshToken() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "refresh_token") {
      return value;
    }
  }
  return null;
}

function checkTokenExpiration() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("Access token not found");
    return;
  }

  const decodedToken = decodeAccessToken(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the token is about to expire (e.g., within the next (5 * 60) seconds)
  if (decodedToken.exp - currentTime <= 300) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      refreshAccessToken(refreshToken)
        .then((newAccessToken) => {
          setTokens(newAccessToken, refreshToken);
          console.log("Access token refreshed successfully");
        })
        .catch((error) => {
          console.error("Failed to refresh access token:", error);
        });
    } else {
      console.error("Refresh token not found");
    }
  }
}

function decodeAccessToken(accessToken) {
  const tokenPayload = accessToken.split(".")[1];
  return JSON.parse(atob(tokenPayload));
}

const refreshTokenInterval = 5 * 60 * 1000;
setInterval(checkTokenExpiration, refreshTokenInterval); // Check every (5 * 60) seconds
