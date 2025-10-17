const Item = require("../model/itemModel");

async function getItems(req, res) {
  const result = await Item.findAll();
  res.status(200).json({ data: result });
}

async function addItem(req, res) {
  //   const { name, quantity, description, price } = req.body;
  console.log(req.body);
  const { itemName, description, price, stockQuantity: stock } = req.body;
  await Item.create({
    itemName,
    description,
    price,
    stock,
  });
  console.log("Item added successfully");
  res.status(201).json({ message: "item added" });
}

async function updateItem(req, res) {
  const id = req.params.id;
  const quantitySold = Number(req.body.quantity);

  const item = await Item.findByPk(id);
  if (item === null) {
    return res.status(400).json({ message: "Item not Found" });
  } else {
    const newStock = item.stock - quantitySold; // computing the new quantity after selling
    if (newStock < 0) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }
    await Item.update(
      { stock: newStock }, // updating the quantity in the db
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
