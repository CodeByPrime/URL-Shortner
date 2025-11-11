const express = require("express");
const path = require("path");
const app = express();
const urlrouter = require("./routes/url.route");
const staticRouter = require("./routes/staticrouter");
const connecttomongodb = require("./config/database_connect");
const urlModel = require("./model/url.model");

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use("/url", urlrouter);
app.use("/", staticRouter);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
connecttomongodb("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("failed to connect to mongodb", err);
  });

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
