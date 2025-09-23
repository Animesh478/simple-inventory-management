const Item = require("./itemModel");

async function synchronizeModels() {
  await Item.sync({ force: true });
  console.log("Appointment table synchronized");
}

module.exports = synchronizeModels;
