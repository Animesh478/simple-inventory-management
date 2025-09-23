const Item = require("../model/itemModel");

async function getItems(req, res) {
  const result = await Item.findAll();
  res.status(200).json(result);
}

async function addItem(req, res) {
  //   const { name, quantity, description, price } = req.body;
  console.log(req.body);
  await Item.create({
    itemName: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  console.log("Item added successfully");
  res.status(201).json({ message: "item added" });
}

module.exports = {
  getItems,
  addItem,
};
