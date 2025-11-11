const { nanoid } = require("nanoid");
const urlModel = require("../model/url.model");
const mongoose = require("mongoose");

async function Handlegenerateshorturl(req, res) {
  const body = req.body;
  console.log("Request body:", req.body); // Debug log
  if (!body || !body.url) {
    return res.status(400).json({ message: "url is required" });
  }
  const shortId = nanoid(9);
  await urlModel.create({
    shortId: shortId,
    redirectUrl: body.url,
    visithistory: [],
  });
 return res.render('home',{
  id:shortId
 })
}

async function Handlegetanalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await urlModel.findOne({ shortId });
  return res.json({
    totalclicks: result.visithistory.length,
    analytics: result.visithistory,
  });
}
async function redirectUser(req, res) {
  const shortId = req.params.shortId;
  const entry = await urlModel.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visithistory: { timestamp: Date.now() } } }
  );
  if (!entry) {
    return res.status(404).json({ message: "Short URL not found" });
  }
  res.redirect(entry.redirectUrl);
}
module.exports = { Handlegenerateshorturl, Handlegetanalytics, redirectUser };
