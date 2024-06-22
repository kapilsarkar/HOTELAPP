const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//Middleware Function :
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); //Move on to the next phase
};

app.use(logRequest)

app.get("/", (req, res) => {
  res.send("Welcome to Our Hotel");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//Use the router
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("Server is Listening at port:5000");
});
