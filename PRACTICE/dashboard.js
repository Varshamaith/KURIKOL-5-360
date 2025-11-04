document.addEventListener("DOMContentLoaded", async () => {
    const email = localStorage.getItem("loggedInEmail");

    if (!email) {
        window.location.href = "index.html"; // Redirect if not logged in
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/get_farmer_details?email=${email}`);
        const farmer = await response.json();

        if (farmer) {
            document.getElementById("farmerName").innerText = farmer.name;
            document.getElementById("farmerEmail").innerText = farmer.email;
            document.getElementById("farmerPhone").innerText = farmer.phone;
            document.getElementById("farmerAge").innerText = farmer.age;
            document.getElementById("farmerAddress").innerText = farmer.address;
            document.getElementById("farmerLand").innerText = farmer.landType;
            document.getElementById("farmerGender").innerText = farmer.gender;
        }
    } catch (error) {
        console.error("Error fetching farmer details:", error);
    }
});

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

// Logout
function logout() {
    localStorage.removeItem("loggedInEmail");
    window.location.href = "index.html";
}
