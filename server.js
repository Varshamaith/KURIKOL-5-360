const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || "my_super_secret_key";

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/AgriConnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Farmer Schema (Updated for proper authentication)
const farmerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: String,
    age: Number,
    address: String,
    landType: String,
    gender: String,
    password: String // Hashed password will be stored here
});

// Farmer Model
const Farmer = mongoose.model("Farmer", farmerSchema);

// 🟢 Farmer Registration API
app.post("/farmer_register", async (req, res) => {
    try {
        const { name, email, phone, age, address, landType, gender, password } = req.body;

        // Check if the email is already registered
        const existingFarmer = await Farmer.findOne({ email });
        if (existingFarmer) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save farmer in DB
        const newFarmer = new Farmer({
            name, email, phone, age, address, landType, gender, password: hashedPassword
        });

        await newFarmer.save();
        res.status(201).json({ message: "Registered Successfully" });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// 🟢 Farmer Login API
app.post("/login", async (req, res) => {
    try {
        const { category, email, password } = req.body;

        // Check if the category is valid
        if (category !== "Farmer") {
            return res.status(400).json({ message: "Invalid category" });
        }

        // Find user by email
        const farmer = await Farmer.findOne({ email });
        if (!farmer) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, farmer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: farmer._id, category }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login Successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get farmer details by email (or use `_id` if preferred)
app.get("/get_farmer_details", async (req, res) => {
    const email = req.query.email;

    try {
        const farmer = await Farmer.findOne({ email }).select("-password -__v");

        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }

        res.json(farmer);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving farmer details" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
