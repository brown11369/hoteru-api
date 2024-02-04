const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    blogName:{
        type:String,
        required:true,
        unique:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    status:{
        type:String,
        default:"draft"
    },
    keywords:{
        type:[]
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    }
},{timestamps:true})


const blogModel=mongoose.model("blogs",blogSchema)

module.exports=blogModel;