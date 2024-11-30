const express = require("express");
const { blogController } = require('../controllers/');

const router = express.Router();

router
    .get('/getBlogs', blogController.getBlogs)
    .post('/likeBlog', blogController.likeBlog)
    .post('/unlikeBlog', blogController.removeLike)
    .post('/createPost', blogController.createPost)


module.exports = router;