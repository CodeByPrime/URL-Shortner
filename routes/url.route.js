const express=require("express")
const {Handlegenerateshorturl,Handlegetanalytics,redirectUser}=require("../controller/url.controller")

const app=express()
const router=express.Router()
router.post("/",Handlegenerateshorturl)
router.get("/analytics/:shortId",Handlegetanalytics)
router.get("/:shortId",redirectUser)
module.exports=router;