const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Todo = require("./models/Todo.js");
const config = require("./config.js");

// Set up express
const app = express();

// Connect to MongoDB
mongoose.connect(config.MONGODB_CONNECTION_STRING);

// setup MiddleWares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/todos", (req, res) => {
  const status = req.query.status || "all";

  if (status === "all") {
    Todo.find()
      .then((todos) => res.json(todos))
      .catch(() => res.status(500).send("An error occurred"));
    return;
  }

  Todo.find()
    .where("completed")
    .equals(status === "completed")
    .then((todos) => res.json(todos))
    .catch(() => res.status(500).send("An error occurred"));
});

app.get("/todos/active", (req, res) => {
  Todo.find({ completed: false })
    .then((todos) => res.json({ numberOfActiveTodos: todos.length }))
    .catch(() => res.status(500).send("An error occurred"));
});

app.post("/todos", (req, res) => {
  Todo.create({
    body: req.body.body,
    completed: req.body.completed,
  })
    .then(() => Todo.find())
    .then((todos) => res.status(201).json(todos))
    .catch((e) => res.status(400).json({ messgae: e.message }));
});

app.patch("/todos/:id/mark-as-completed", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      todo.completed = !todo.completed;
      return todo.save();
    })
    .then((updated) => res.json(updated));
});

app.delete("/todos/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((deleteTodo) => {
      if (!deleteTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return Todo.find();
    })
    .then((todos) => res.status(200).json(todos));
});

app.listen(process.env.EXPRESS_PORT, () =>
  console.log("express connection successful")
);
