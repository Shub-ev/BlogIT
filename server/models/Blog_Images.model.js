const mongoose = require("mongoose");

const BlogImageSchema = mongoose.Schema({
    imageData: {
        type: String,
        required: [true, "Image data is required!"],
    },
    contentType: {
        type: String, // MIME type (e.g., 'image/jpeg', 'image/png')
        required: [true, "Image content type is required!"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const BlogImageModel = mongoose.model("blogImages", BlogImageSchema);

module.exports = BlogImageModel;