function capitalizeString(daString) {
  if (daString.match(/\W/)) {
    const daWarudos = daString.split(" ");
    daWarudos.forEach((warudo, index) => {
      daWarudos[index] = warudo.charAt(0).toUpperCase();
    });
    return daWarudos.join(" ");
  } else {
    return daString.charAt(0).toUpperCase() + daString.slice(1);
  }
}

module.exports = {
  capitalizeString,
};
