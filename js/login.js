document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".signin-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the user has entered values
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      // Make a POST request to obtain the access token
      const response = await fetch("https://ssces-fum.ir/users/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status === 200 || response.status === 201) {
        hideErrors();
        
        const data = await response.json();

        // Store the access token in an HTTP-only cookie with the Secure flag
        document.cookie = `access_token=${data.access}; Secure;`;
        document.cookie = `refresh_token=${data.refresh}; Secure;`;

        // Redirect to the main page (index.html)
        window.location.href = "index.html";
      } else {
        hideErrors();
        checkCredentials();
        console.log("Login failed. Please check your credentials.");
        return;
      }
    } catch (error) {
      hideErrors();
      checkConnection();
      console.log("An error occurred during login.");
      return;
    }
  });
});

function checkCredentials() {
  showError("credentials-error");
}

function checkConnection() {
  showError("connection-error");
}

function hideErrors() {
  hideError("credentials-error");
  hideError("connection-error");
}

function showError(errorId) {
  const errorElement = document.querySelector(`#${errorId}`);
  errorElement.removeAttribute("style");
}

function hideError(errorId) {
  const errorElement = document.querySelector(`#${errorId}`);
  errorElement.setAttribute("style", "display: none !important;");
}