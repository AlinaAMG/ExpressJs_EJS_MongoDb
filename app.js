require('dotenv').config();
const express = require("express");
const app = express();
const routes = require("./config/routes");
const apiRoutes = require("./config/apiRoutes");
require("./config/mongoose");


app.use("/public",express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// API route
app.use("/api", apiRoutes);

// Browser route
app.use(routes);




app.listen(4000, () => {
    console.log("Server is op port 4000");
})
