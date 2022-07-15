const express = require("express");
const notePadSchema = require("../schemas/notePad.schema");

const router = express.Router();

router.post("/:userId", async (req, res, next) => {
  console.log(">>> s", req.params.userId);
  const note = await notePadSchema.findOne({
    userId: req.url.slice(1),
    noteId: req.body.id,
  });
  if (!note) {
    const newNote = new notePadSchema({
      userId: req.url.slice(1),
      noteId: req.body.id,
      title: req.body.title,
      content: req.body.content,
      color: req.body.color,
    });
    newNote.save();
    res.sendStatus(200);
  } else {
    await notePadSchema.updateOne(
      { userId: req.url.slice(1), noteId: req.body.id },
      {
        $set: {
          userId: req.url.slice(1),
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

module.exports = router;
