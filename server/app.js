const express = require("express");
require("dotenv").config({ path: "../.env" });

const sequelize = require("./config/db");
const synchronizeModels = require("./model/index");
const itemRouter = require("./routes/itemRoutes");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/items", itemRouter);

sequelize.authenticate().then(() => {
  console.log("Connection established successfully");
  synchronizeModels();
  app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
  });
});
