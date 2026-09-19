// MICRO CONSULTANCY - Login

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;

    // Mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter a valid 10 digit mobile number.");
        return;
    }

    // Login request
    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mobile,
            password
        })
    });

    const result = await response.json();

    if (result.success) {
        // Logged in user ko browser me temporarily save karo
        localStorage.setItem("user", JSON.stringify(result.user));

        // Dashboard open
        window.location.href = "dashboard.html";
    } else {
        alert(result.message);
    }
});