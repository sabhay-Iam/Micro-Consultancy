const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Public folder serve karo
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// users.json ka path
const FILE = path.join(__dirname, "users.json");

// Agar users.json nahi hai to bana do
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]", "utf8");
    console.log("users.json created.");
}

// Registration API
app.post("/register", (req, res) => {
    const { name, father, email, mobile, dob, address, password } = req.body;

    let users = JSON.parse(fs.readFileSync(FILE, "utf8"));

    // Mobile already registered?
    const exists = users.find(user => user.mobile === mobile);

    if (exists) {
        return res.json({
            success: false,
            message: "Mobile number already registered."
        });
    }

    // New user save
    users.push({
        name,
        father,
        email,
        mobile,
        dob,
        address,
        password
    });

    fs.writeFileSync(FILE, JSON.stringify(users, null, 2));

    res.json({
        success: true,
        message: "Registration Successful!"
    });
});

// Login API
app.post("/login", (req, res) => {
    const { mobile, password } = req.body;

    let users = JSON.parse(fs.readFileSync(FILE, "utf8"));

    const user = users.find(
        u => u.mobile === mobile && u.password === password
    );

    if (!user) {
        return res.json({
            success: false,
            message: "Invalid Mobile Number or Password."
        });
    }

    res.json({
        success: true,
        user: user
    });
});

// Server Start
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});