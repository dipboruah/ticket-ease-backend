const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db");
const PORT = process.env.PORT || 8000;
const cors = require("cors");

connectDB();

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to suport desk API!" });
});
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
