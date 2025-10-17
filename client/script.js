const form = document.getElementById("form");
const inventoryEl = document.querySelector(".inventory");
const itemsList = document.querySelector(".items-list");
const productTemplate = document.querySelector(".item-template");

// function to toggle the quantity of each item
const toggleItemQuantity = function (event, id, stock) {
  const rowEl = event.currentTarget.parentElement.parentElement;
  const quantityEl = rowEl.querySelector(".quantity");
  let quantity = parseInt(quantityEl.textContent);

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
      if (quantity > 0) {
        quantity -= 1;
      }
      if (quantity === 0) {
        quantity = 0;
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
  itemsList.innerHTML = "";
  const itemsArray = await getAllItems();

  itemsArray.forEach((item) => {
    const itemClone = productTemplate.content.cloneNode(true); //create clone from the template

    itemClone.querySelector(".row").dataset.id = item.id;
    itemClone.querySelector(".item").textContent = item.itemName;
    itemClone.querySelector(".desc").textContent = item.description;
    itemClone.querySelector(".price").textContent = `₹${item.price}`;
    itemClone.querySelector(".stock").textContent = item.stock;

    itemClone
      .querySelector(".quantity-container")
      .addEventListener("click", (event) => {
        toggleItemQuantity(event, item.id, item.stock);
      });

    itemClone.querySelector(".buy-btn").addEventListener("click", (event) => {
      buyItem(event, item.id);
    });

    itemsList.appendChild(itemClone);
  });
};

// when we add a new item
const addItem = async function () {
  const formData = new FormData(form);
  const itemObj = {};

  formData.forEach((value, key) => {
    itemObj[key] = value;
  });

  try {
    await axios.post("http://localhost:3000/items", itemObj);
    await displayAllItems();
    form.reset();
  } catch (error) {
    console.log(error);
  }
};

// when we click the buy button
const buyItem = async function (event, id) {
  const rowEl = event.target.parentElement.parentElement;
  if (parseInt(rowEl.dataset.id) === id) {
    const quantityToSell = parseInt(
      rowEl.querySelector(".quantity").textContent
    );
    if (quantityToSell === 0) return;

    try {
      await axios.put(`http://localhost:3000/items/${id}`, {
        quantity: quantityToSell,
      });
      displayAllItems();
    } catch (error) {
      console.log(error);
    }
  }
};

// Event Listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addItem();
});

const init = function () {
  displayAllItems();
};
init();
