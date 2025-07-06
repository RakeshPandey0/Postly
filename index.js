const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const staticRoutes = require("./routes/static.routes");
const userRoutes = require("./routes/user.routes");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication.middleware");
const PORT = 8000;

const app = express();

//database
connectDB();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//check for authentication cookie only after using the cookie-parser middleware.
app.use(checkForAuthenticationCookie("token"));

//set EJS and views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes
app.use("/", staticRoutes);
app.use("/user/", userRoutes);

//initiate server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
