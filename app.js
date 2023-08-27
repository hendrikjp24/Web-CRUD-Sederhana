const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const expressLayout = require("express-ejs-layouts");

// setting express
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayout);

// connection db
require("./util/db");

// get Model from folder models
const Mahasiswa = require("./models/Mahasiswa");

// Home Page
app.get("/", async (req, res)=>{

    // penggunaan sort => sesuai namanya untuk melakukan sort berdasarkan kriteria yang diberikan
    const Contacts = await Mahasiswa.find().sort({name : "asc"}).exec();

    res.render("contacts",{
        title : "Home Page",
        layout: "layout/layout",
        Contacts
    });
})

//Form Add Contact
app.get("/add", (req, res) => {
    res.render("formAdd", {
        title : "Add Contact",
        layout : "layout/layout"
    });
});

app.listen(port, ()=>{
    console.log("Web service running on || http://localhost:3000");
})

