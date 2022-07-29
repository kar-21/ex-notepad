const notePadSchema = require("../schemas/notePad.schema");

exports.postNote = async (req, res, next) => {
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
    res.status(405).send("Post Operation not permitted");
  }
};

exports.patchNote = async (req, res, next) => {
  const note = await notePadSchema.findOne({
    userId: req.params.userId,
    noteId: req.body.id,
  });
  if (note) {
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
  } else {
    res.status(405).send("Post Operation not permitted");
  }
};

exports.getNotes = async (req, res, next) => {
  const note = await notePadSchema.find({
    userId: req.params.userId,
  });
  res.send(note);
};

exports.deleteNotes = async (req, res, next) => {
  const note = await notePadSchema.deleteOne({
    userId: req.params.userId,
    noteId: req.body.noteId,
  });
  res.status(200).send(note);
};
