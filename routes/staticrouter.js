const express=require('express')

const router=express.Router()

router.get('/',async (req,res)=>{
    const allurls= await urlModel.find({})
    return res.render('home',{urls:allurls})
})
module.exports=router;