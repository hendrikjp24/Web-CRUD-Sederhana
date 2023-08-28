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

// Router post for form add contact
app.post("/add", async (req, res) => {

    const dataMahasiswa = {
        name : req.body.name,
        age : req.body.age,
        jurusan : req.body.jurusan,
        contact : {
            email : req.body.email,
            noHp : req.body.noHp
        }
    };

    await Mahasiswa.insertMany(dataMahasiswa).then(result => {
        res.redirect("/");
    });

})

//router for delete contact
app.delete("/delete", async (req, res) => {
    await Mahasiswa.deleteOne(req.body).then(result => {
        res.redirect("/");
    })
})

// router for to form edit contact
app.get("/edit/:id", async (req, res) => {

    try {
        const contacts = await Mahasiswa.findOne({_id : req.params.id});
    
        res.render("formEdit", {
            title: "Edit Contact",
            layout: "layout/layout",
            contacts 
        });
        
    } catch (error) {
        res.send(error);
    }

})

app.listen(port, ()=>{
    console.log("Web service running on || http://localhost:3000");
})

