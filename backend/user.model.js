import mongoose from "mongoose";

// username, email, password (if user logs in via app), DOB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    unique: false,
  },
  age: {
    type: String,
    required: true,
    unique: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
