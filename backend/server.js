import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { run } from "./mongoConfig.js";
import User from "./user.model.js";

dotenv.config();
const MONGODB_URI = process.env.DATABASE_URL || "";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

run();
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Successfully connect to mongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Add basic middlewarex

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Post request to save user
app.post("/api/users", (req, res) => {
  const { displayName, email, age } = req.body;
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Content cannot be empty." });
  } else {
    User.findOrCreate(
      { name: displayName, email: email, age: age },
      (err, user) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Internal Server Error: 500" });
        }
        return res.status(201).send({ message: "User saved", user });
      }
    );
  }
});

app.listen(PORT, async (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
  const newUser = new User({
    username: "Alice",
    email: "alice@example.com",
    age: 30,
  });
  // await newUser.save();
});
