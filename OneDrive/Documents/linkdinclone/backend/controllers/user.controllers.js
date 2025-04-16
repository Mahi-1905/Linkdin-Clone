import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import ConnectionRequest from "../models/connectionRequest.model.js";
import Post from "../models/posts.model.js";

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const sendConnectionRequest = async (req, res) => {
    try {
        const { token, connectionId } = req.body;

        if (!token || !connectionId) {
            return res.status(400).json({ message: "Token and connection ID are required" });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connectionUser = await User.findById(connectionId);
        if (!connectionUser) {
            return res.status(404).json({ message: "Connection user not found" });
        }

        if (user._id.toString() === connectionId) {
            return res.status(400).json({ message: "You cannot send a request to yourself" });
        }

        const existingRequest = await ConnectionRequest.findOne({ userId: user._id, connectionId });

        if (existingRequest) {
            return res.status(400).json({ message: "Connection request already sent" });
        }

        const request = new ConnectionRequest({
            userId: user._id,
            connectionId: connectionUser._id,
            statusAccepted: false,
        });

        await request.save();

        return res.json({ message: "Connection request sent successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getMyConnectionRequests = async (req, res) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await ConnectionRequest.find({ connectionId: user._id, statusAccepted: false })
            .populate("userId", "name username email profilePicture");

        return res.json({ connections });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getMyConnections = async (req, res) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await ConnectionRequest.find({ 
            $or: [{ userId: user._id }, { connectionId: user._id }], 
            statusAccepted: true 
        }).populate("userId connectionId", "name username email profilePicture");

        return res.json({ connections });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const acceptConnectionRequest = async (req, res) => {
    try {
        const { token, requestId, actionType } = req.body;

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connection = await ConnectionRequest.findById(requestId);
        if (!connection) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (actionType === "accept") {
            connection.statusAccepted = true;
        } else if (actionType === "reject") {
            await ConnectionRequest.deleteOne({ _id: requestId });
            return res.json({ message: "Connection request rejected" });
        } else {
            return res.status(400).json({ message: "Invalid action type" });
        }

        await connection.save();
        return res.json({ message: "Connection request accepted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name username email profilePicture');
        return res.json({ posts });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const commentpost = async (req,res) => {

    const {token,post_id,commentBody} = req.body;

    try {

         const user = await User.findOne({token: token}).select("_id");

         if(!user) {
             return res.status(404).json({message: "user not found"})
         }


         const post = await post.findOne({
            id: post_id
         });
         
         if(!post) {
             return res.status(404).json({message:"post not found"})
         }

         const commen = new comment ({
            userId: user._id,
            postId:post_id,
            comment: commentBody
         });

         await comment.save();

         return res.status(200).json({message:"comment Added"})




    }

    catch(err) {

        return res.status(500).json({message:err.message})
    }
}
