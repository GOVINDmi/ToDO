const { createTodo } = require("./type.js");
require("dotenv").config();
const { Todo } = require("./db.js");
const express = require("express");
const authMiddleware = require("./authMiddleware");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/auth", require("./authRoutes.js"));


app.listen(port, function () {
  console.log("Server is listening on port", port);
});

app.post('/todo', authMiddleware, async (req, res) => {
  const toCreate = req.body;
  const response = createTodo.safeParse(toCreate);

  if (!response.success) {
    return res.status(411).json({ msg: "Not valid input" });
  }

  const newTodo = new Todo({
    userId: req.user.id,
    title: toCreate.title,
    description: toCreate.description,
    completed: false
  });

  await newTodo.save();

  res.json({ msg: "Todo created" });
});

app.get('/todo', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json({ todos });
});

app.put('/completed/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const { title, description, completed } = req.body;

  await Todo.updateOne({ _id: id, userId: req.user.id }, { title, description, completed });

  res.json({ msg: "Todo updated" });
});

app.delete('/todo/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const toDelete = await Todo.findOne({ _id: id, userId: req.user.id });

  if (toDelete && toDelete.completed) {
    await Todo.deleteOne({ _id: id });
    res.json({ msg: "Todo deleted" });
  } else {
    res.status(400).json({ msg: "Cannot delete incomplete todo" });
  }
});
