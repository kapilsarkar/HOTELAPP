const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;


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

app.use(logRequest); //Apply Middle ware to all the routes

passport.use(
  new localStrategy(async (USERNAME, password, done) => {
    //authentication logic here
    try {
      console.log("Received Credentials", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect Username." });

      const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize())

app.get("/", passport.authenticate('local',{session:false}), (req, res) => {
  res.send("Welcome to Our Hotel");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const Person = require("./models/person");

//Use the router
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("Server is Listening at port:5000");
});
