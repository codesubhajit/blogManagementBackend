import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;

  if (!title || !content || !file) {
    throw new ApiError(400, "Title, content, and image are required");
  }

  const uploadResult = await uploadOnCloudinary(file.path);
  if (!uploadResult) {
    throw new ApiError(500, "Image upload failed");
  }

  const newBlog = await Blog.create({
    title,
    content,
    image: uploadResult.secure_url,
    author: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, newBlog, "Blog created successfully"));
});


export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("author", "name email");
  res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});


export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name email");
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});


export const updateBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this blog");
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;

  if (req.file) {
    const uploadResult = await uploadOnCloudinary(req.file.path);
    if (uploadResult) blog.image = uploadResult.secure_url;
  }

  await blog.save();
  res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
});


export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog || blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this blog");
  }

  await blog.deleteOne();
  res.status(200).json(new ApiResponse(200, {}, "Blog deleted successfully"));
});
