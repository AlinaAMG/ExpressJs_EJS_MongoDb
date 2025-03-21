const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://alina:alina82@cluster-test.ibpnh.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster-test")
    .then(result => {
     console.log("DB is connected");
    })
.catch(err=>console.log(err))