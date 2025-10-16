// Import the login function from your API layer
import { loginUser } from "./api.js";

// Get the necessary elements from the DOM
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

// Add an event listener to the form for the 'submit' event
loginForm.addEventListener("submit", async (event) => {
    // Prevent the default browser action of reloading the page
    event.preventDefault();

    // Clear any previous error messages and hide the error box
    loginError.textContent = "";
    loginError.style.display = "none";

    // Get the values from the email and password input fields
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log(email, password);
    try {
        // Use the imported loginUser function to make the API call
        // This function is expected to be in api.js and should handle the fetch request
        await loginUser(email, password);
        alert("Login successful!");
        console.log("Login successful!");

        // If the login is successful and doesn't throw an error, redirect to the dashboard
        window.location.href = "./dashboard.html";
    } catch (error) {
        // If an error is caught (e.g., from a failed network request or 401 response),
        // display the error message in the designated div
        loginError.textContent = error.message;
        loginError.style.display = "block"; // Make the error box visible
    }
});
