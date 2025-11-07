const express=require("express")
const {Handlegenerateshorturl}=require("../controller/url.controller")

const app=express()
const router=express.Router()
router.post("/",Handlegenerateshorturl(req,res))
module.exports=router;