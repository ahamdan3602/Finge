import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import User from "./user.model.js";

dotenv.config();
const MONGODB_URI = process.env.DATABASE_URL || "";

const app = express();
const PORT = 3000; // Changed to avoid conflicts

// CORS middleware MUST come before other middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Body parser middleware
app.use(express.json());

// Remove the separate mongoConfig run() - use only mongoose
// Connect to MongoDB with better error handling
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Fixed POST route - was /api/:users (wrong), should be /api/users
app.post("/api/users", async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const { displayName, email, uid } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email });

    if (!user) {
      // Create new user
      user = new User({
        username: displayName || "Unknown User",
        email: email,
        uid: uid,
        age: "18", // Default age
      });
      await user.save();
      console.log("User created:", user);
      return res.status(201).json({ message: "User created", user });
    } else {
      console.log("User exists:", user);
      return res.status(200).json({ message: "User already exists", user });
    }
  } catch (error) {
    console.error("Error saving user:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// GET users endpoint
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`Server listening on http://localhost:${PORT}`);
});
