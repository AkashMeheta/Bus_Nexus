const mongoose = require('mongoose');

const userSchemea = new mongoose.Schema({
    Name : {
        type:String,
        required: true
    },
    Email : {
        type: String,
        required: true,
        unique: true
    },
    Password : {
        type: String,
        required: true
    }
});

//collection

const Register = new mongoose.model("user", userSchemea);

module.exports = Register;