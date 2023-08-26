const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testApi")
.then(() => console.log("connection success"))
.catch(error => console.log("connection failed"));