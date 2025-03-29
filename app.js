require('dotenv').config();
const express = require('express');

const app = express();
const routes = require('./config/routes');
const apiRoutes = require('./config/apiRoutes');
const userRoutes = require("./config/userRoutes");
const cookieParser = require("cookie-parser");
require('./config/mongoose');
app.use(cookieParser());

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');


// User routes
app.use(userRoutes);


// Browser route
app.use(routes);


// API route
app.use('/api', apiRoutes);

app.listen(4000, () => {
  console.log('Server is op port 4000');
});
