const recipeModel = require("../model/recipeModel")
const addRecipe = async (req, res) => {
    try {
        const recipe = req.body
        if (!recipe?.recipeName || !recipe?.price) return res.status(400).send({ success: false, message: "recipe name and price are required" })
        const existRecipe = await recipeModel.findOne({ recipeName: recipe?.recipeName })
        if (existRecipe) return res.status(409).send({ success: false, message: "recipe exists" }); //conflict

        //create new recipe 
        const newRecipe = new recipeModel(recipe);

        await newRecipe.save();

        res.status(201).json({ success: true, message: "recipe added" });
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

}


const allRecipes = async (req, res) => {
    try {
        const recipes = await recipeModel.find()
        res.send({ success: true, data: recipes });
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

}

const recipe = async (req, res) => {
    try {
        let recipeID = req.params.id;
        const recipe = await recipeModel.findById({ _id: recipeID })
        res.send({ success: true, data: recipe });
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

}

const updateRecipe = async (req, res) => {
    try {
        let recipeData = req.body;
        let recipeID = req.params.id;

        const foundRecipe = await blogModel.findOne({ _id: recipeID })
        if (!foundRecipe) return res.status(404).send({ success: false, message: "recipe not exist" })


        await recipeModel.updateOne({ _id: recipeID }, recipeData)

        res.send({ success: true, message: "recipe updated" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const deleteRecipe = async (req, res) => {
    try {
        let recipeID = req.params.id;
        await recipeModel.deleteOne({ _id: recipeID })

        res.send({ success: true, message: "recipe deleted" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

}

module.exports = { addRecipe, allRecipes, recipe, updateRecipe, deleteRecipe }