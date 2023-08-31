// Validasi inputan for name
const isValidName = (name) => {

    const regexName = new RegExp("^[a-zA-Z ]*$");

    return regexName.test(name);
}

// Validasi for input age
const isValidAge = (age) => {
    const regexAge = new RegExp("^[1-9]{1}[0-9]*$");

    let isValid = regexAge.test(age) && age.length <= 2 && age.length >= 1;

    return isValid;
}

