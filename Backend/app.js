const path = require("path");
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
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: "vHelp"
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(authJwt());
app.use(errorHandler);

// Routes
const vendorRoutes = require("./routes/vendor");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");
const homeRoute = require("./routes/home");

app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/index", indexRoutes);
app.use("/", homeRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started @ ${PORT}`);
});
