const CapitalizeFirstLetter = (data) => {
    const arrName = data.toLowerCase().split(" ");

    //Looping to change first letter of word to capital
    for(let i = 0; i < arrName.length ; i++){
        arrName[i] = String(arrName[i]).charAt(0).toUpperCase() + String(arrName[i]).substring(1);
    }

    return arrName.join(" ");

}

module.exports = {CapitalizeFirstLetter};