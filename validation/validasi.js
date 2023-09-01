const validator = require("validator");

// Validasi inputan for name
const isValidName = (name) => {

    const regexName = new RegExp("^[a-zA-Z ]*$");

    return regexName.test(name);
}

// Validasi for input age
const isValidAge = (age) => {
    const regexAge = new RegExp("^[1-9]{1}[0-9]*$");

    let isValid = regexAge.test(age);

    return isValid;
}

// validasi email
const isValidEmail = (email) => {
    return validator.isEmail(email);
}


module.exports = {isValidName, isValidAge, isValidEmail};
