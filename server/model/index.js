const Item = require("./itemModel");

async function synchronizeModels() {
  await Item.sync();
  console.log("Appointment table synchronized");
}

module.exports = synchronizeModels;
