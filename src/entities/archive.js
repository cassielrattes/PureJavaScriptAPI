class Archive {
  constructor({ name, pathFile }) {
    this.id = Math.floor(Math.random() * 100) + Date.now();
    this.pathFile = pathFile;
    this.name = name;
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this);
    const amountInvalid = propertyNames
      .map((property) => (!!this[property] ? null : `${property} is missing!`))
      .filter((item) => !!item);

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid,
    };
  }
}

module.exports = Archive;
