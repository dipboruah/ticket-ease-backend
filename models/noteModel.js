const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "tickets",
    },

    text: {
      type: String,
      required: [true, "Please add a note"],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },

    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };
