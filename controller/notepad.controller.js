const notePadSchema = require("../schemas/notePad.schema");

exports.postNote = async (req, res, next) => {
  const note = await notePadSchema.findOne({
    userId: req.params.userId,
    noteId: req.body.noteId,
  });
  if (!note) {
    const newNote = new notePadSchema({
      userId: req.params.userId,
      noteId: req.body.noteId,
      title: req.body.title,
      content: req.body.content,
      color: req.body.color,
    });
    newNote.save();
    res.sendStatus(200);
  } else {
    res.status(405).send("Post Operation not permitted");
  }
};

exports.patchNote = async (req, res, next) => {
  const note = await notePadSchema.findOne({
    userId: req.params.userId,
    noteId: req.body.noteId,
  });
  if (note) {
    await notePadSchema.updateOne(
      { userId: req.params.userId, noteId: req.body.noteId },
      {
        $set: {
          userId: req.params.userId,
          noteId: req.body.noteId,
          title: req.body.title,
          content: req.body.content,
          color: req.body.color,
        },
      }
    );
    res.sendStatus(200);
  } else {
    res.status(405).send("Patch Operation not permitted");
  }
};

exports.getNotes = async (req, res, next) => {
  const note = await notePadSchema.find({
    userId: req.params.userId,
  });
  if (note) res.send(note);
  else res.status(404).send("No Notes Found");
};

exports.deleteNotes = async (req, res, next) => {
  const note = await notePadSchema.deleteOne({
    userId: req.params.userId,
    noteId: req.body.noteId,
  });
  if (note) res.status(200).send(note);
  else res.status(405).send("Delete Operation not permitted");
};
