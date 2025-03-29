
const express = require('express');
const route = express.Router();
const userLoginController = require("../controllers/userSignLoginController");
const userAutth=require("../auth/auth")

// User Routes
route.get("/user/signup-login",userAutth.isSignupLoginEnable, userLoginController.renderSignupLoginPage);
route.post("/user/signup-login", userLoginController.signupPage);
route.post("/user/login", userLoginController.login);
route.get("/logout", userLoginController.logOut);


module.exports = route;







