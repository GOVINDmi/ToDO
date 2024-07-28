const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://govindmi:GovindMishra12345.....@cluster0.gxctcev.mongodb.net/todo_app');
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

const todoSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  completed: Boolean
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  User,
  Todo
};
