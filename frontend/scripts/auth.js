// Import the function we need from api.js
import { loginUser } from "./api.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
        // Use the imported function to make the API call
        await loginUser(email, password);
        alert("Login successful!");
        window.location.href = "/dashboard.html"; // Redirect on success
    } catch (error) {
        document.getElementById("error-message").textContent = error.message;
    }
});
