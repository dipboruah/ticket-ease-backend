const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },

    products: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "iMac", "iPad", "macbook"],
    },
    description: {
      type: String,
      required: [true, "Please add a description of the issue!"],
    },

    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const TicketModel = mongoose.model("ticket", ticketSchema);

module.exports = { TicketModel };
