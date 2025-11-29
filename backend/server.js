import express from "express";
// import * as mongoConfig from "./mongoConfig";
import { run } from "./mongoConfig.js";
const app = express();
const PORT = 3000;
run();

// Add basic middlewarex
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
