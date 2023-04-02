const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/userModel");
const { TicketModel } = require("../models/ticketModel");
const { NoteModel } = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  //get user using id from the JWT
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const ticket = await TicketModel.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  const notes = await NoteModel.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

const postNote = asyncHandler(async (req, res) => {
  //get user using id from the JWT
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const ticket = await TicketModel.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  const note = await NoteModel.create({
    text: req.body.text,
    ticket: req.params.ticketId,
    isStaff: false,
    user: req.user.id,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  postNote,
};
