const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const cardSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const boardSchema = new mongoose.Schema({
  title: String,
  cards: [cardSchema],
});

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  cpassword: { type: String, require: true },
  boards: [boardSchema],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
