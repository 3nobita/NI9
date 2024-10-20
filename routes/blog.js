const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Show all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.render('index', { blogs });
});

// Show trending blogs
router.get('/trending', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('trending', { blogs });
});

// Show individual blog post
// router.get('/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);
//         if (!blog) {
//             return res.status(404).send('Blog not found');
//         }
//         res.render('blog', { blog });
//     } catch (error) {
//         console.error(error);
//         return res.status(400).send('Invalid blog ID');
//     }
// });

// Show new blog form
router.get('/new', (req, res) => {
    res.render('new');
});

// Handle new blog creation
router.post('/new', upload.single('image'), async (req, res) => {
    const { heading, about } = req.body;
    const image = req.file.path.replace(/\\/g, '/');

    const blog = new Blog({ heading, about, image });
    await blog.save();
    res.redirect('/');
});

module.exports = router;


// Show admin panel
router.get('/admin', async (req, res) => {
    const blogs = await Blog.find();
    res.render('admin', { blogs });
});

// Render edit form
router.get('/admin/edit/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    res.render('edit', { blog }); // Create an edit.ejs file for the edit form
});

// Handle blog update
router.post('/admin/edit/:id', upload.single('image'), async (req, res) => {
    const { heading, about } = req.body;
    const updatedData = { heading, about };

    if (req.file) {
        updatedData.image = req.file.path.replace(/\\/g, '/'); // Ensure proper path format
    }

    await Blog.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/admin'); // Redirect back to admin page
});

// Handle blog deletion
router.post('/admin/delete/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/admin'); // Redirect back to admin page
});
