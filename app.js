const express = require('express');

// express app
const app = express();
const routes = require("./config/routes");
require("./config/mongoose");

// register view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
// listen for requests
app.use(routes);

// Middleware
app.use((req,res,next) => {
    console.log("new request made:");
    console.log("host:", req.hostname);
    console.log("path:", req.path);
    console.log("method:", req.method);
    next();
})


app.use((req,res,next) => {
    console.log("in the next middleware");
    
    next();
})

app.listen(4000, () => {
  console.log(`The server is running op port 4000`);
});


