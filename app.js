const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const expressLayout = require("express-ejs-layouts");

// setting express
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayout);

app.get("/", (req, res) => {
    
})

app.listen(port, ()=>{
    console.log("Web service running on || https://localhost:3000");
})

