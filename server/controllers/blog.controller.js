const mongoose = require("mongoose");
const { BlogModel, BlogImageModel, UserModel } = require("../models/");

const createPost = async (req, res) => {
    try {
        const { user, title, tags, content, imgData, contentType } = req.body;

        const existingUser = await UserModel.findOne({ username: user });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is not available!",
            });
        }

        if (!imgData || !contentType) {
            return res.status(400).json({
                success: false,
                message: "Image data and content type are required!",
            });
        }

        // const imageBuffer = Buffer.from(imgData, 'base64');

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const imageDoc = new BlogImageModel({ imageData: imgData, contentType });
            const savedImage = await imageDoc.save({ session });

            const blog = new BlogModel({ 
                user, 
                title, 
                tags, 
                content, 
                image: savedImage._id
            });
            await blog.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: 'Blog Created Successfully!',
                user: existingUser.email,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error while creating blog!",
            error: error,
        });
    }
}

const getBlogs = async (req, res) => {
    try{
        const blogs = await BlogModel.find({});

        const finalBlogs = [];
        
        for(let blog of blogs){
            const imageData = await BlogImageModel.findOne({ _id: blog.image });
            const author = await UserModel.findOne({ username: blog.user });
            const { username, avatar } = author;
            const {liked_users, likes, title, _id} = blog.toObject()

            const base64Image = imageData.imageData.toString('base64');

            finalBlogs.push({
                ...{liked_users, likes, title, _id},
                base64Image,
                username,
                avatar,
            })
        }

        res.status(200).json({
            success: true,
            message: "Fetched blogs successfully",
            blogs: finalBlogs
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error while getting blogs!",
            error: err,
        })
    }
}

const likeBlog = async (req, res) => {
    try {
        const { blogId, email } = req.body;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID",
            });
        }
        if (!email || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "User not authenticated!"
            });
        }

        const id = new mongoose.Types.ObjectId(blogId);
        const blog = await BlogModel.updateOne(
            { _id: id, liked_users: { $ne: email } },
            { 
                $inc: { likes: 1 },
                $addToSet: { liked_users: email }
            }
        );

        if (blog.modifiedCount > 0) {
            res.status(200).json({ 
                success: true,
                message: "Blog liked successfully" 
            });
        }
        else {
            res.status(400).json({ 
                success: false,
                message: "Blog already liked or not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error 
        });
    }
}


const removeLike = async (req, res) => {
    try {
        const { blogId, email } = req.body;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID",
            });
        }
        if (!email || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "User not authenticated!"
            });
        }

        const id = new mongoose.Types.ObjectId(blogId);
        const blog = await BlogModel.updateOne(
            { _id: id, liked_users: email },
            { 
                $inc: { likes: -1 },
                $pull: { liked_users: email }
            }
        );

        if (blog.modifiedCount > 0) {
            // Ensure likes do not go below zero
            await BlogModel.updateOne(
                { _id: id, likes: { $lt: 0 } },
                { $set: { likes: 0 } }
            );

            res.status(200).json({ 
                success: true,
                message: "Blog unliked successfully" 
            });
        }
        else {
            res.status(400).json({ 
                success: false,
                message: "Blog not liked by user or not found",
            });
        }
    }
    catch(error){
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error 
        });
    }
}


module.exports = {
    createPost,
    getBlogs,
    likeBlog,
    removeLike
}