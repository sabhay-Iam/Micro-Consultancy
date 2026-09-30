const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// --- Supabase Config ---
const SUPABASE_URL = "https://apfwowqcdoqoxhqzrobr.supabase.co";
const SUPABASE_KEY = "sb_publishable_6ls9RfeRonRHgGOqgF97gA_q6NhJ_Pc";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Public folder serve karo
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// --- Registration API ---
app.post("/register", async (req, res) => {
  const { name, father, email, mobile, dob, address, password } = req.body;

  // Pehle check karo ki mobile number exist karta hai ya nahi
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("mobile_number", mobile)
    .single();

  if (existingUser) {
    return res.json({
      success: false,
      message: "Mobile number already registered",
    });
  }

  // Naya user insert karo
  const { error } = await supabase.from("users").insert([
    {
      full_name: name,
      fathers_name: father,
      email: email,
      mobile_number: mobile,
      dob: dob,
      address: address,
      password: password,
    },
  ]);

  if (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    message: "Registration Successful!",
  });
});

// --- Login API ---
app.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("mobile_number", mobile)
    .eq("password", password)
    .single();

  if (error || !user) {
    return res.json({
      success: false,
      message: "Invalid Mobile Number or Password.",
    });
  }

  res.json({
    success: true,
    user: user,
  });
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
