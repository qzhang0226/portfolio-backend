const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();

// Middlewares
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join("uploads")));

// Home
const homeRoute = require("./routes/home");
app.use("/home", homeRoute);

// About
const aboutRoute = require("./routes/about");
app.use("/about", aboutRoute);

// Profile
const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);

// Experience
const experienceRoute = require("./routes/experience");
app.use("/experience", experienceRoute);

// Project
const projectRoute = require("./routes/project");
app.use("/project", projectRoute);

// Quotation
const quoteRoute = require("./routes/quotation");
app.use("/quotation", quoteRoute);

// Contact
const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

// Blogs
const blogsRoute = require("./routes/blogs");
app.use("/blog", blogsRoute);

// ROUTES
app.get("/", (req, res) => {
  res.send("We are on home!");
});

mongoose.connect(
  "mongodb+srv://dbUser:Cjn984869795@cluster0-rymjq.mongodb.net/jeeny-backend?retryWrites=true&w=1",
  { useNewUrlParser: true },
  () => console.log("connected to DB")
);

module.exports = app;
