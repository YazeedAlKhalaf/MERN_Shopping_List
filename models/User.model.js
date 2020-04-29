const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 16,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    max: 350,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
