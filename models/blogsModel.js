import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Blog title field is required. Please add a title!"]
    },
    content: {
        type: String,
        required: [true, "Blog content field is required. Please add a content!"]
    },
    image: { 
        type: String,
        required: [true, "Blog image field is required. Please add an image!"]
    },
}, {
    timestamps: true,
});

export const Blog = mongoose.model("Blog", blogSchema);