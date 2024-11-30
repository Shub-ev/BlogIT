const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    user: {
        type: String,
        required: [true],
    },
    title: {
        type: String,
        required: [ true, "Blog title is required!" ],
        validate: {
            validator: (value) => value.length >= 5,
            message: "Title must be atleast 5 characters long!"
        },
        trim: true,
    },
    tags: {
        type: [String],
        required: [true, "Atleast one tag is required!"],
        validate: {
            validator: (tags) => tags.length > 0,
            message: "Atleast one tag is required!",
        },
    },
    content: {
        type: String,
        trim: [true, "Blog content is required!"],
        required: true,
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    liked_users: {
        type: [String],
        default: [],
    }
})

const BlogModel = mongoose.model("Blogs", BlogSchema);

module.exports = BlogModel;