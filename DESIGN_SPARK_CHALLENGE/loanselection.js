// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const farmer = require("farmer");

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// Connect to MongoDB (AgriConnect Database)
// mongoose.connect("mongodb://localhost:27017/AgriConnect", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err));


// API: Assign Loan Scheme to Farmer
app.put("/api/farmers/:id/loan", async (req, res) => {
    try {
        const { loanScheme } = req.body;
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        farmer.loanScheme = loanScheme;
        await farmer.save();
        res.json({ message: "Loan scheme assigned successfully" });

    } catch (error) {
        res.status(500).json({ error: "Error updating loan scheme" });
    }
});

// API: Get Farmer Details
app.get("/api/farmers/:id", async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found" });
        }
        res.json(farmer);

    } catch (error) {
        res.status(500).json({ error: "Error fetching farmer details" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
