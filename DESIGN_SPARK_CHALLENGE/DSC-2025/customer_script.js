const API_URL = "http://localhost:5000";

// Register Function
async function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const gender = document.getElementById("gender").value;
    const native = document.getElementById("native").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, age, address, gender, native, password })
    });

    const result = await response.json();
    document.getElementById("message").innerText = result.message;
    if (response.status === 201) {
        window.location.href = "customer_login.html";
    }
}

// Login Function
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    document.getElementById("message").innerText = result.message;
    if (response.status === 200) {
        window.location.href = "/";
    }
}
