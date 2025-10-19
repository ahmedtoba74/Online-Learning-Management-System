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
    
    // Validate inputs
    if (!email || !password) {
        loginError.textContent = "Please enter both email and password";
        loginError.style.display = "block";
        return;
    }
    
    console.log("Attempting to log in with:", { email, password });
    
    try {
        // Use the imported function to make the API call
        const response = await loginUser(email, password);
        console.log("Login successful:", response);
        alert("Login successful!");
        
        // If the login is successful and doesn't throw an error, redirect to the dashboard
        window.location.href = "./dashboard.html";
    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
        loginError.textContent = error.message || "Login failed. Please try again.";
        loginError.style.display = "block";
    }
});
