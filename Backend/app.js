const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");

const app = express();
env.config();

app.use(cors());
app.options("*", cors());

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());

app.listen(3000, () => {
  console.log("Server Started!");
});
