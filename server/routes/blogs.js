const express = require('express');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { authenticateUser } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', authenticateUser, upload.single('image'), async (req, res) => {
  const { title, description, content, category } = req.body;
  if (!title || !description || !content || !category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Image is required.' });
  }

  const imageURL = `/uploads/${req.file.filename}`;


  try {
    const blog = new Blog({
      title,
      description,
      content,
      category,
      author: req.user.id,
      imageURL,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', authenticateUser, async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username email');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/search', authenticateUser, async (req, res) => {
  const { title, category } = req.query;
  try {
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; 
    }
    if (category) {
      filter.category = category; 
    }

    const blogs = await Blog.find(filter).populate('author', 'username email');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate('author', 'username email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
