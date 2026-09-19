// MICRO CONSULTANCY - Dashboard

// Login user ki details localStorage se lo
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    // Agar login nahi hua hai to login page par bhejo
    window.location.href = "login.html";
}

// Dashboard me data show karo
document.getElementById("userName").textContent = user.name;
document.getElementById("fatherName").textContent = user.father;
document.getElementById("email").textContent = user.email;
document.getElementById("mobile").textContent = user.mobile;
document.getElementById("dob").textContent = user.dob;
document.getElementById("address").textContent = user.address;

// Logout Button
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});