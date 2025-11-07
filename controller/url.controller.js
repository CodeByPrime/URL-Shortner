const {nanoid}=require("nanoid")
const urlModel=require("../model/url.model")
const mongoose=require("mongoose")

async function Handlegenerateshorturl(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).json({message:"url is required"})
    const shortId=nanoid(9);
    await urlModel.create({
        shortId: shortId,
        redirectUrl:body.redirectUrl,
        visithistory:[]
    })
    res.status(201).json({shortUrl:`http://localhost:3000/${shortId}`})
}
module.exports={Handlegenerateshorturl}