const express=require("express")
const {Handlegenerateshorturl,Handlegetanalytics}=require("../controller/url.controller")

const app=express()
const router=express.Router()
router.post("/",Handlegenerateshorturl)
router.get("/analytics/:shortId",Handlegetanalytics)
module.exports=router;