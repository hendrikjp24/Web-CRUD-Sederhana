const CapitalizeFirstLetter = (data) => {
    let splitData = data.toLowerCase().split(" ");

    for(let i = 0; i < splitData.length ; i++){
        splitData[i] = splitData[i].chartAt(0).toUpperCase() + splitData[i].substring(1);
    }

    return splitData.join(" ");
}

module.exports = {CapitalizeFirstLetter};