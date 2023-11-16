import asyncHandler from "express-async-handler";
import { Blog } from "../models/blogsModel.js";
import { User } from "../models/usersModel.js";

// @desc Get Goals
// @route GET /blogs
// @access Private
export const getBlog = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ user: req.user.id });
    res.status(200).json({ blogs });
});

// @desc Create Blog
// @route POST /blogs
// @access Private
export const createBlog = asyncHandler(async (req, res) => {
    // to accept body data (from forms)
    // and to have an error handler
    if(!req.body.title && !req.body.image && !req.body.content){
        res.status(400);
        throw new Error("All field is required");
    };

    const blog = await Blog.create({
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        user: req.user.id
    });

    res.status(200).json({blog});
});

// @desc Update Blog
// @route PUT /blogs/:id
// @access Private
export const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if(!blog) {
        res.status(400);
        throw new Error ("Blog doesn't exists!");
    };

    const user = await User.findById(req.user.id);

    // Check if user exists
    if(!user) {
        res.status(401);
        throw new Error ("User not found!");
    };

    // Make sure the logged in user matches the blog user
    if(blog.user.toString() !== user.id) {
        res.status(401);
        throw new Error ("User not authorized!");
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json({updatedBlog});
});

// @desc Delete Blog
// @route DELETE /blogs/:id
// @access Private
export const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if(!blog) {
        res.status(400);
        throw new Error ("Blog doesn't exists!");
    };

    const user = await User.findById(req.user.id);

    // Check if user exists
    if(!user) {
        res.status(401);
        throw new Error ("User not found!");
    };

    // Make sure the logged in user matches the blog user
    if(blog.user.toString() !== user.id) {
        res.status(401);
        throw new Error ("User not authorized!");
    };

    await blog.deleteOne();

    res.status(200).json({ id: req.params.id });
});