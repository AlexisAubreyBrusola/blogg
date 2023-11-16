import express from "express";
export const router = express.Router();
import { getBlog, createBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js"

router.get("/", protect, getBlog);

router.post("/", protect, createBlog);

router.put("/:id", protect, updateBlog);

router.delete("/:id", protect, deleteBlog);

// if some of the routes are the same, we can 
// clean it a little bit more

// get and post route:
// router.route('/').get(getBlog).post(createBlog);

// put and delete route:
// router.route('/:id').put(updateBlog).delete(deleteBlog);