const blogModel = require("../model/blogModel");

const addBlog = async (req, res) => {
    try {
        const blogData = req.body;
        if (!blogData?.blogName || !blogData.body) return res.status(400).send({ success: false, message: "blog name and description required" });
        const foundBlog = await blogModel.findOne({ blogName: blogData?.blogName })
        if (foundBlog) return res.status(409).send({ success: false, message: "blog exist" })

        const newBlog = new blogModel(blogData)
        newBlog.save()

        res.status(201).send({ success: true, message: "blog added" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const allBlogs = async (req, res) => {
    try {
        const allBlogs = await blogModel.find();
        res.status(200).send({ success: true, data: allBlogs })
    }
    catch (err) {
        res.status(500).send({ success: "false", message: err.message })
    }
}

const blog = async (req, res) => {
    try {
        const blogID = req.params.id;
        const blog = await blogModel.findOne({ _id: blogID })
        res.status(200).send(blog)
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const updateBlog = async (req, res) => {
    try {
        const updateBlogData = req.body;
        const blogID = req.params.id;

        const foundBlog = await blogModel.findOne({ _id: blogID })
        if (!foundBlog) return res.status(404).send({ success: false, message: "blog not exist" })

        await blogModel.findByIdAndUpdate(blogID , updateBlogData)
       
        res.status(200).send({ success: true, message: "blog updated" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const blogID = req.params.id;
        await blogModel.deleteOne({ _id: blogID });
        res.status(200).send({ success: true, message: "blog deleted" })

    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

module.exports = { addBlog, allBlogs, blog, updateBlog, deleteBlog }