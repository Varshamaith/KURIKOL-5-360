async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const category = document.getElementById("category").value; // Get selected category

    if (!email || !password) {
        document.getElementById("message").innerText = "All fields are required!";
        document.getElementById("message").style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, category })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("message").innerText = data.message;
            document.getElementById("message").style.color = "green";

            // ✅ Save email in localStorage
            localStorage.setItem("loggedInEmail", email);

            // ✅ Redirect to Dashboard
            setTimeout(() => {
                window.location.href = "farmer_dashboard.html";
            }, 2000);
        } else {
            document.getElementById("message").innerText = data.message;
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        console.error("Login Error:", error);
        document.getElementById("message").innerText = "Login failed. Try again.";
        document.getElementById("message").style.color = "red";
    }
}
