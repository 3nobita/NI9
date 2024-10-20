const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    headingOne: { type: String, required: true },
    about: { type: String, required: true },
    aboutOne: { type: String, required: true },
    image: { type: String, required: true },
    imgOne: { type: String, required: true },
    location: { type: String, required: true },
    dates: { type: String},
}, { timestamps: true }); // This adds createdAt and updatedAt fields

module.exports = mongoose.model('Blog', blogSchema);
