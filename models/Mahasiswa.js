const mongoose = require("mongoose");

const schemaMahasiswa = new mongoose.Schema({
    name : String,
    age : Number,
    jurusan : String,
    contact : {
        email : String,
        noHp : String
    }

});

const Mahasiswa = new mongoose.model("mahasiswa", schemaMahasiswa);

module.exports = Mahasiswa;