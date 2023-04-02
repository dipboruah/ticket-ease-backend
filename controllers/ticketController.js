const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/userModel");
const { TicketModel } = require("../models/ticketModel");

//@desc Get ticket
// @route GET /api/ticket
// @access private
const getTickets = asyncHandler(async (req, res) => {
  //get user using id from the JWT
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const tickets = await TicketModel.find({ user: req.user.id });
  res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
  //get user using id from the JWT
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const ticket = await TicketModel.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
  res.status(200).json(ticket);
});

//@desc Get ticket
// @route POST /api/ticket
// @access private
const createTicket = asyncHandler(async (req, res) => {
  const { products, description } = req.body;

  if (!products || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }
  //get user using id from the JWT
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const ticket = await TicketModel.create({
    products,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(201).json(ticket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  //get user using id from the JWT
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const ticket = await TicketModel.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
  console.log(ticket);
  await ticket.deleteOne();

  res.status(200).json({ success: "true" });
});

const updateTicket = asyncHandler(async (req, res) => {
  //get user using id from the JWT
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const ticket = await TicketModel.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  const updatedTicket = await TicketModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
