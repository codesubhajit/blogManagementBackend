import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blog.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", verifyJWT, upload.single("image"), createBlog);
router.put("/:id", verifyJWT, upload.single("image"), updateBlog);
router.delete("/:id", verifyJWT, deleteBlog);

export default router;
