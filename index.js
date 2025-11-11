const express = require("express");
const path =require('path')
const app = express();
const urlrouter = require("./routes/url.route");
const connecttomongodb = require("./config/database_connect");
const urlModel = require("./model/url.model");

app.use(express.json());
app.use("/url", urlrouter);
app.set("view engine","ejs")
app.set('views',path.resolve("./views"))
connecttomongodb("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("failed to connect to mongodb", err);
  });

app.get("/home", async (req, res) => {
  const allUrls = await urlModel.find({});

  return res.render('home')
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
