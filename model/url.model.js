const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        require:true
    },
    visithistory:[{timestamp:{type:Number}}]
},{timestamps:true})
const urlModel=mongoose.model("url",urlSchema)

module.exports=urlModel;