const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      default: [],
      required: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);