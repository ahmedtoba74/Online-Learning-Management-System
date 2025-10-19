// Import the login function from your API layer
import { loginUser } from "./api.js";
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

console.log("Login form element:", loginForm);

loginForm.addEventListener("submit", async (event) => {
    // Prevent the default browser action of reloading the page
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    // Clear any previous error messages and hide the error box
    loginError.textContent = "";
    loginError.style.display = "none";
    console.log(email, password);
    try {
        // Use the imported function to make the API call
        console.log("Attempting to log in with:", { email, password });
        await loginUser(email, password);
        console.log("Login successful");
        alert("Login successful!");
        console.log("Login successful!");

        // If the login is successful and doesn't throw an error, redirect to the dashboard
        window.location.href = "./dashboard.html";
    } catch (error) {
        document.getElementById("login-error").textContent = error.message;
    }
});
