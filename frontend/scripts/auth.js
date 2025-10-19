// Import the function we need from api.js
import { loginUser } from "./api.js";
const loginForm = document.getElementById("login-form");

console.log("Login form element:", loginForm);

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    try {
        // Use the imported function to make the API call
        console.log("Attempting to log in with:", { email, password });
        await loginUser(email, password);
        console.log("Login successful");
        alert("Login successful!");
        window.location.href = "/dashboard.html"; // Redirect on success
    } catch (error) {
        document.getElementById("login-error").textContent = error.message;
    }
});
