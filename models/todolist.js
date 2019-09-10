var mongoose = require("mongoose");

var todolistSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    require: true
  }
});

var Todolist = mongoose.model("todolist", todolistSchema);
module.exports = Todolist;
