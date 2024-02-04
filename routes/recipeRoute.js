const express=require("express");
const { allRecipes, addRecipe, recipe, updateRecipe, deleteRecipe } = require("../controllers/recipeController");
const router=express.Router()
const verifyJWT=require("../middlewares/verifyJWT")

router.get("/all",allRecipes)
router.get("/single/:id",recipe)
router.post("/add",verifyJWT,addRecipe)
router.patch("/update/:id",verifyJWT,updateRecipe)
router.delete("/delete/:id",verifyJWT,deleteRecipe)


module.exports=router;