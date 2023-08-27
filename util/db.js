const mongoose = require("mongoose");

try {
    mongoose.connect("mongodb://localhost:27017/testApi");
} catch (error) {
    console.log(error);
}