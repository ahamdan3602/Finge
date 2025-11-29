import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { run } from "./mongoConfig.js";
import User from "./user.model.js";

dotenv.config();
const MONGODB_URI = process.env.DATABASE_URL || "";

const app = express();
const PORT = 3000;
run();
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Successfully connect to mongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Add basic middlewarex
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, async (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
  const newUser = new User({
    username: "Alice",
    email: "alice@example.com",
    age: 30,
  });
  await newUser.save();
});
