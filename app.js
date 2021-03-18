const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Contact
const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

// ROUTES
app.get("/", (req, res) => {
  res.send("We are on home!");
});
// app.use("/uploads", express.static(path.join("uploads")));

// Home
// const homeRoute = require("./routes/home");
// app.use("/home", homeRoute);

// About
// const aboutRoute = require("./routes/about");
// app.use("/about", aboutRoute);

// Profile
// const profileRoute = require("./routes/profile");
// app.use("/profile", profileRoute);

// Experience
// const experienceRoute = require("./routes/experience");
// app.use("/experience", experienceRoute);

// Project
// const projectRoute = require("./routes/project");
// app.use("/project", projectRoute);

// Quotation
// const quoteRoute = require("./routes/quotation");
// app.use("/quotation", quoteRoute);

// Blogs
// const blogsRoute = require("./routes/blogs");
// app.use("/blog", blogsRoute);

mongoose.connect(
  // process.env.DB_CONNCETION
  "mongodb+srv://jenny:cjndeLAOg0226qi@jenny-backend.mwocm.mongodb.net/jennyBackend?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

module.exports = app;
