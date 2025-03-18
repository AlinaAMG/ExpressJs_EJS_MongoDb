const express = require("express");
const app = express();
const routes = require("./config/routes");


app.use("/public",express.static("public"))
app.use(routes);
app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("Server is op port 3000");
})
