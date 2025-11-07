const express=require("express")
const app=express()
const urlrouter=require("./routes/url.route")
const connecttomongodb = require("./config/database_connect")

app.use("/url",urlrouter)
connecttomongodb("mongodb://localhost:27017/short-url").then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log("failed to connect to mongodb",err)
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})