require('dotenv').config();
const express = require("express");
const app = express();
const routes = require("./config/routes");
require("./config/mongoose");




app.use("/public",express.static("public"))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);



app.listen(3000, () => {
    console.log("Server is op port 3000");
})
