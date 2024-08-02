import Blog from "../models/Blog.js"

// Add a new blog
const addblog = async (req, res) => {
  const { title, description ,picture} = req.body;
  try {
    const newBlog = new Blog({ title, description ,picture});
    await newBlog.save();
    res.status(201).json({ newBlog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a blog by ID
const deleteblog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single blog by ID
const getsingleblog = async (req, res) => {
  const { id } = req.params;
  try {
    const singleBlog = await Blog.findById(id);
    if (!singleBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ singleBlog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs
const getAllblogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.status(200).json({ allBlogs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { addblog, deleteblog, getAllblogs, getsingleblog };
