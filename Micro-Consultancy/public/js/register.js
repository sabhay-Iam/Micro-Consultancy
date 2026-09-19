// MICRO CONSULTANCY - Registration

document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const father = document.getElementById("father").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }

    // Password match validation
    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return;
    }

    // Data server ko bhejna
    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            father,
            email,
            mobile,
            dob,
            address,
            password
        })
    });

    const result = await response.json();

    alert(result.message);

    if (result.success) {
        window.location.href = "login.html";
    }
});