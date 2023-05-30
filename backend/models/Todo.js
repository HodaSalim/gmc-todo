const mongoose = require("mongoose");

const timestamp = require("./plugins/timestamp");

const todoSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, "The todo title field is required."],
    max: [50, "The todo title can not exceed 50 charachters."],
  },
  completed: Boolean,
});

todoSchema.plugin(timestamp);

module.exports = mongoose.model("Todo", todoSchema);
