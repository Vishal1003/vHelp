const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const env = require("dotenv");
const authJwt = require("./middlewares/jwt");

const app = express();
env.config();

app.use(cors());
app.options("*", cors());

// database connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "vHelp"
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authJwt());
app.use(errorHandler);

// Routes
const vendorRoutes = require("./routes/vendor");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");

app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/index", indexRoutes);

app.listen(3000, () => {
    console.log("Server Started!");
});
