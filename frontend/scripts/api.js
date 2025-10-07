// This function sends login data to the backend
export async function loginUser(email, password) {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return response.json();
}

// This function gets a list of courses from the backend
export async function fetchCourses() {
    const response = await fetch("http://localhost:3000/api/v1/courses", {
        credentials: "include",
    });
    if (!response.ok) throw new Error("Could not fetch courses.");
    return response.json();
}
