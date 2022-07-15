const { Schema, model } = require("mongoose");

const NotePadSchema = new Schema({
  userId: String,
  noteId: String,
  title: String,
  content: String,
  color: String,
});

module.exports = model("notePads", NotePadSchema);
