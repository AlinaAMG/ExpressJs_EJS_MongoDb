const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    if (req.cookies.userToken) {
        next();
    
    } else {
        res.redirect("user/signup-login");
    }
}

const isSignupLoginEnable = (req, res, next) => {
    if (req.cookies.userToken) {
        res.redirect("/")
    } else {
        next();
    }
}
module.exports = {
    isLoggedIn,
    isSignupLoginEnable,
}