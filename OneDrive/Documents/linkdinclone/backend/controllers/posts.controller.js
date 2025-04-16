import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js"; // Assuming you have a Comment model

export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "Running" });
};

export const createPost = async (req, res) => {
    const { token, body } = req.body;

    try {
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({
            userId: user._id,
            body,
            media: req.file ? req.file.filename : "",
            filetypes: req.file ? req.file.mimetype.split("/")[1] : "",
            likes: 0,
        });

        await newPost.save();

        return res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name username email profilePicture');
        return res.json({ posts });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const deletePost = async (req, res) => {
    const { token, post_id } = req.body;

    try {
        const user = await User.findOne({ token }).select("_id");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
        }

        await Post.findByIdAndDelete(post_id);
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    const { post_id } = req.body;

    try {
        const post = await Post.findById(post_id).populate("comments");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.json({ comments: post.comments });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const deleteComment = async (req, res) => {
    const { token, comment_id } = req.body;

    try {
        const user = await User.findOne({ token }).select("_id");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const comment = await Comment.findById(comment_id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Comment.findByIdAndDelete(comment_id);
        return res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const incrementLikes = async (req, res) => {
    const { post_id } = req.body;

    try {
        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.likes += 1;
        await post.save();

        return res.json({ message: "Likes incremented", likes: post.likes });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
