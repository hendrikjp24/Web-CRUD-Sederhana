const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const expressLayout = require("express-ejs-layouts");
const {body, check} = require("express-validator");

// setting express
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayout);

// connection db
require("./util/db");

//Load Function that i make
const serviceData = require("./services/data");

//Load validation with regex
const validation = require("./validation/validasi");

// get Model from folder models
const Mahasiswa = require("./models/Mahasiswa");
const { validationResult } = require("express-validator");

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
app.post("/add",[
    body("name").custom(async name => {
        const isValidInput = validation.isValidName(name);

        if(!isValidInput){
            throw new Error("Nama hanya boleh mengandung huruf alphabet saja");
        }

        const dataContact = await Mahasiswa.findOne({name: serviceData.CapitalizeFirstLetter(name)});

        if(dataContact){
            throw new Error("Data Contact Dengan Nama Tersebut Sudah Ada!");
        }
    }),
    check("noHp", "Masukkan No Hp Yang valid!!").isMobilePhone("id-ID"),
    body("age").custom(age => {
        const isValidInput = validation.isValidAge(age);

        if(!isValidInput){
            throw new Error("Inputan Age hanya berupa angka saja!!");
        }

        // // validasi berdasarkan length inputan
        if(age.length > 2){
            throw new Error("Batas Umur yang dimasukkan hanya 2 digit saja");
        }

        // to solve when the rule wass passing but still error with message 'invalid value'
        return true;

    }),
    body("email").custom(email => {
        if(email == ""){
            return true;
        }

        const isValidEmail = validation.isValidEmail(email);

        if(isValidEmail){
            return true;
        }

    }).withMessage("Masukkan email yang valid!!")
],
async (req, res) => {

    const result = validationResult(req);

    if(!result.isEmpty()){
        
        res.render("formAdd", {
            title : "Add Contact",
            layout: "layout/layout",
            errors: result.array(),
            data : req.body
        });

    }else{

        // Penggunaan Regex
        // ada dua cara pembuatan regex,
        // 1. dengan fungsi object bawaan RegExp
        // 2. dengan pembuatan regex manual
        // const testRegex = new RegExp("^[a-zA-Z ]*$");
        // const regexName = /^[a-zA-Z ]*$/;

        // let test = testRegex.test(req.body.name);

        // res.send(test);

        try {
            const dataMahasiswa = {
                name : serviceData.CapitalizeFirstLetter(req.body.name),
                age : Number(req.body.age),
                jurusan : req.body.jurusan,
                contact : {
                    email : req.body.email,
                    noHp : req.body.noHp
                }
            };
        
            await Mahasiswa.insertMany(dataMahasiswa).then(result => {
                res.redirect("/");
            });
            
        } catch (error) {
            res.status(404).send(error);

        }

    }
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

//Update COntact
app.put("/update",[
    body("name").custom(async (name, {req}) => {
        const isValidInput = validation.isValidName(name);

        if(!isValidInput){
            throw new Error("Nama hanya boleh mengandung huruf alphabet saja!!");
        }

        const isDuplicateName = await Mahasiswa.findOne({name : serviceData.CapitalizeFirstLetter(name)});

        const isSameData = req.body.id == isDuplicateName._id;

        if(isDuplicateName && !isSameData){
            throw new Error("Sudah ada data contact dengan nama tersebut!!");
        }
    }),
    body("age").custom(age => {
        const isValidInput = validation.isValidAge(age);

        if(!isValidInput){
            throw new Error("Umur hanya boleh mengandung angka saja!!");
        }

        if(age.length > 2){
            throw new Error("Umur hanya boleh dimasukkan 2 digit saja!!");
        }

        return true;
    }),
    body("email").custom(email => {
        if(email == ""){
            return true;
        }

        const  isValidEmail = validation.isValidEmail(email);

        if(isValidEmail){
            return true;
        }

    }).withMessage("Masukkan email yang valid!!"),
    check("noHp", "Masukkan No Hp yang valid!!").isMobilePhone("id-ID")
], async (req, res) => {

    const result = validationResult(req);

    if(!result.isEmpty()){
        res.status(404).send(result);
    
    }else{
        try {
            const dataContact = {
                name : serviceData.CapitalizeFirstLetter(req.body.name),
                age: Number(req.body.age),
                jurusan : req.body.jurusan,
                contact : {
                    email : req.body.email,
                    noHp : req.body.noHp
                }
            };
    
            await Mahasiswa.findOneAndUpdate({_id : req.body.id}, dataContact).then(result => {
                res.redirect("/");
            });
            
        } catch (error) {
            res.send(error);
        }

    }


})


// router default jika link tidak dapat diakses
app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
})

app.listen(port, ()=>{
    console.log("Web service running on || http://localhost:3000");
})

