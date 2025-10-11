const Item = require("../model/itemModel");

async function getItems(req, res) {
  const result = await Item.findAll();
  res.status(200).json(result);
}

async function addItem(req, res) {
  //   const { name, quantity, description, price } = req.body;
  await Item.create({
    itemName: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  console.log("Item added successfully");
  res.status(201).json({ message: "item added" });
}

async function updateItem(req, res) {
  const id = req.params.id;
  const quantitySold = Number(req.body.quantitySold);

  const item = await Item.findByPk(id);
  if (item === null) {
    return res.status(400).json({ message: "Item not Found" });
  } else {
    const newQuantity = item.quantity - quantitySold; // computing the new quantity after selling
    await Item.update(
      { quantity: newQuantity }, // updating the quantity in the db
      {
        where: {
          id,
        },
      }
    );
  }
  return res.status(200).json({ message: "Quantity modified" });
}

module.exports = {
  getItems,
  addItem,
  updateItem,
};
