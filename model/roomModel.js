const mongoose= require("mongoose");

const roomSchema=mongoose.Schema({
    roomName:{
        type:String,
        required:true,
        unique:true,
    },
    body:{
        type:String,
    },
    features:{
        type:[]
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    tag:{
        type:[]
    },
    status:{
        type:String,
        default:"draft"
    },
    keywords:{
        type:[]
    },
    metaTitle:{
        type:String,
    },
    metaDescription:{
        type:String
    }
},{timestamps:true})


const roomModel=mongoose.model("rooms",roomSchema)

module.exports=roomModel;