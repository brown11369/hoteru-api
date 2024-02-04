const mongoose= require("mongoose")

const recipeSchema=mongoose.Schema({
    recipeName:{
        type:String,
        required:true
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
    status:{
        type:String,
        default:"draft"
    },
    veg:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[]
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

const recipeModel=mongoose.model("recipes",recipeSchema)

module.exports=recipeModel;