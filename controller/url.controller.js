const { nanoid } = require("nanoid");
const urlModel = require("../model/url.model");
const mongoose = require("mongoose");

async function Handlegenerateshorturl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "url is required" });
  const shortId = nanoid(9);
  await urlModel.create({
    shortId: shortId,
    redirectUrl: body.url,
    visithistory: [],
  });
  res.status(201).json({ shortUrl: `http://localhost:3000/${shortId}` });
}

async function Handlegetanalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await urlModel.findOne({ shortId });
  return res.json({
    totalclicks: result.visithistory.length,
    analytics: result.visithistory,
  });
}
module.exports = { Handlegenerateshorturl ,Handlegetanalytics};
