const form = document.getElementById("form");
const inventoryEl = document.querySelector(".inventory");
const productTemplate = document.querySelector(".item-template");

// function to toggle the quantity of each item
const toggleItemQuantity = function (event, id, stock) {
  const quantityEl = document.querySelector(".quantity");
  let quantity = parseInt(quantityEl.textContent);
  const rowEl = event.currentTarget.parentElement.parentElement;

  if (parseInt(rowEl.dataset.id) === id) {
    if (event.target.className === "quantityIncrement") {
      if (quantity < stock) {
        quantity += 1;
      }
      if (quantity >= stock) {
        quantity = stock;
      }
    }
    if (event.target.className === "quantityDecrement") {
      if (quantity > 1) {
        quantity -= 1;
      }
      if (quantity === 1) {
        quantity = 1;
      }
    }
  }
  quantityEl.textContent = quantity;
};

// get all the items from the server
const getAllItems = async function () {
  const result = await axios.get("http://localhost:3000/items");
  return result.data.data; // array of objects
};

// display the items
const displayAllItems = async function () {
  const itemsArray = await getAllItems();
  console.log(itemsArray);
  itemsArray.forEach((item) => {
    const itemClone = productTemplate.content.cloneNode(true); //create clone from the template

    itemClone.querySelector(".row").dataset.id = item.id;
    itemClone.querySelector(".item").textContent = item.itemName;
    itemClone.querySelector(".desc").textContent = item.description;
    itemClone.querySelector(".price").textContent = item.price;
    itemClone.querySelector(".stock").textContent = item.quantity;

    itemClone
      .querySelector(".quantity-container")
      .addEventListener("click", (event) => {
        toggleItemQuantity(event, item.id, item.quantity);
      });

    inventoryEl.appendChild(itemClone);
  });
};

// when we add a new item
const addItem = async function () {};

const buyItem = function () {}; // when we click the buy button

const init = function () {
  displayAllItems();
};
init();
