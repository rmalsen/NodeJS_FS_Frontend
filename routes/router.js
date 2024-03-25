const express = require("express");
const isEmpty = require("../utilities/util");
const messages = require("../utilities/messages");
const {
  validateRegistration,
  validateLogin,
} = require("../validation/validation");
const { postRegister, postLogin } = require("../services/userService");
const axios = require("axios");
let session = require('express-session');
require('dotenv').config();
const router = express.Router();


// Use middleware to create express session
router.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  }))

// Home
router.get("/", (req, res) => {
    session = req.session;
  res.render("home", { pagename: "Home", session: session });
});

// Login
router.get("/login", (req, res) => {
    session = req.session;
  res.render("login", { pagename: "Login", session: session });
});

router.post("/login", (req, res) => {
    session = req.session;
  const errors = validateLogin(req.body);
  if (isEmpty(errors)) {
    postLogin(req.body)
      .then((result) => {
        session.name = result.data.user.firstName;
        session.logged = result.data.logged;
        session.token = result.data.token;
        res.render("home", {
          pagename: "Home",
          message: result.data.message,
          session: session
        });
      })
      .catch((err) => {
        res.render("login", {
          pagename: "Login",
          message: err.response.data.error.message,
        });
      });
  } else {
    res.render("login", {
      pagename: "Login",
      body: req.body,
      errs: errors,
      message: messages.failed_login,
    });
  }
});

// Register
router.get("/register", (req, res) => {
    session = req.session;
  res.render("register", { pagename: "Register", session: session });
});

router.post("/register", (req, res) => {
  const errors = validateRegistration(req.body);
  if (isEmpty(errors)) {
    // Call the backend
    postRegister(req.body)
      .then((result) => {
        res.render("login", {
          pagename: "Login",
          message: messages.successful_registration,
        });
      })
      .catch((err) => {
        res.render("register", { pagename: "Register", message: err });
      });
  } else {
    res.render("register", {
      pagename: "Register",
      body: req.body,
      errs: errors,
      message: messages.failed_registration,
    });
  }
});

// About
router.get("/about", (req, res) => {
    session = req.session;
  res.render("about", { pagename: "About", session: session });
});

router.get("/logout", (req, res) => {
    req.session.destroy(null)
  res.render("home", { pagename: "Home"});
});

module.exports = router;
