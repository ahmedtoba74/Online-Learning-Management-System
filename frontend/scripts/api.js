// This function sends login data to the backend
const BASE_URL = "http://localhost:3000/api/v1";

async function request(path, options = {}) {
    const { method = "GET", headers = {}, body, credentials = "include" } = options;
    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body,
        credentials,
    });

    // Read body once safely
    let parsedBody = null;
    try {
        const text = await response.text();
        if (text) {
            try {
                parsedBody = JSON.parse(text);
            } catch (_) {
                parsedBody = null;
            }
        }
    } catch (_) {
        parsedBody = null;
    }

    if (!response.ok) {
        const message = (parsedBody && (parsedBody.message || parsedBody.error || (Array.isArray(parsedBody.errors) && parsedBody.errors[0]?.message))) || `Request failed (${response.status})`;
        throw new Error(message);
    }

    return parsedBody ?? {};
}

export async function loginUser(email, password) {
    console.log("email", email, "password", password);
    return request("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
}

// This function gets a list of courses from the backend
export async function fetchCourses() {
    return request("/courses");
}
