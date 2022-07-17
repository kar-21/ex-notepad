const express = require("express");
const notePadSchema = require("../schemas/notePad.schema");

const router = express.Router();

router.post("/:userId", async (req, res, next) => {
  const note = await notePadSchema.findOne({
    userId: req.params.userId,
    noteId: req.body.id,
  });
  if (!note) {
    const newNote = new notePadSchema({
      userId: req.params.userId,
      noteId: req.body.id,
      title: req.body.title,
      content: req.body.content,
      color: req.body.color,
    });
    newNote.save();
    res.sendStatus(200);
  } else {
    await notePadSchema.updateOne(
      { userId: req.params.userId, noteId: req.body.id },
      {
        $set: {
          userId: req.params.userId,
          noteId: req.body.id,
          title: req.body.title,
          content: req.body.content,
          color: req.body.color,
        },
      }
    );
    res.sendStatus(200);
  }
});

router.get("/:userId", async (req, res, next) => {
  const note = await notePadSchema.find({
    userId: req.params.userId,
  });
  res.send(note);
});

module.exports = router;
