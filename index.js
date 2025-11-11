const express = require("express");
const app = express();
const urlrouter = require("./routes/url.route");
const connecttomongodb = require("./config/database_connect");
const urlModel = require("./model/url.model");

app.use(express.json());
app.use("/url", urlrouter);
connecttomongodb("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("failed to connect to mongodb", err);
  });
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await urlModel.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visithistory: { timestamp: Date.now() } } }
  );
  if (!entry) {
    return res.status(404).json({ message: "Short URL not found" });
  }
  res.redirect(entry.redirectUrl);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
