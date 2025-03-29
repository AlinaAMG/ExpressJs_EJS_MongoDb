const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const renderSignupLoginPage = (req, res) => {
  res.render('signUpLogin', {
    message: '',
    msg: '',
    msg_notFound: '',
  });
};

const signupPage = async (req, res) => {
  console.log('Request body:', req.body);

  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).render('signUpLogin', {
      title: '',
      message: 'Please fill all fields in!',
      msg: '',
      msg_notFound: '',
    });
  }

  if (req.body.password !== '') {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    let userData = {
      ...req.body,
      password: hashedPassword,
    };
    let newUser = new UserModel(userData);
    newUser
      .save()
      .then((data) => {
        return res.status(201).render('signUpLogin', {
          title: '',
          message: 'User signed In.You can log In!',
          msg: '',
          msg_notFound: '',
        });
      })
      .catch((err) => {
        return res.status(500).render('signUpLogin', {
          title: '',
          message: 'Error in signing up.Please try again!',
          msg: '',
          msg_notFound: '',
        });
      });
  }
}

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).render('signUpLogin', {
      title: '',
      message: '',
      msg: '',
      msg_notFound: '',
    });
  }
  let existUser = await UserModel.findOne({ email: req.body.email });
  if (existUser) {
    let isCorrectPassword = await bcrypt.compare(
      req.body.password,
      existUser.password
    );
    if (isCorrectPassword) {
      let userToken = jwt.sign(
        {
          userId: existUser._id,
          email: existUser.email,
        },
        'User is jwt now'
      );
      console.log('user token:', userToken);
      res.cookie('userToken', userToken);
      return res.redirect('/');
    } else {
      return res.render('signUpLogin', {
        title: '',
        msg: 'Password or email is not correct.Please try again!',
        message: '',
        msg_notFound: '',
      });
    }
  } else {
    return res.render('signUpLogin', {
      title: '',
      msg_notFound: 'User not found.Please sign up first...',
      msg: '',
      message: '',
    });
  }
};

const logOut = (req, res) => {
  res.clearCookie('userToken');
  res.redirect('/');
};

module.exports = {
  renderSignupLoginPage,
  signupPage,
  login,
  logOut,
};
