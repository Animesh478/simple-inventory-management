const express = require("express");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");

const sequelize = require("./config/db");
const synchronizeModels = require("./model/index");
const itemRouter = require("./routes/itemRoutes");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.use("/items", itemRouter);

sequelize.authenticate().then(() => {
  console.log("Connection established successfully");
  synchronizeModels();
  app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
  });
});
