import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages)
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags, subjectId, classId, year, quarter } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags, subjectId, classId, year, quarter })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, subjectId, classId, year, quarter } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, subjectId, classId, year, quarter, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

export const getSpecificPosts = async (req, res) => { 
    const { subjectId } = req.params;
    const { classId } = req.params;
    console.log(subjectId, classId)
    try {
        const posts = await PostMessage.find({
            'subjectId': `${subjectId}`,
            'classId': `${classId}`,
        });
        console.log(posts)
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSubjects = async (req, res) => { 
    try {
        const subjects = await PostMessage.distinct('subjectId');
        console.log(subjects)
        res.status(200).json(subjects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getClasses = async (req, res) => { 
    const { subjectId } = req.params;
    console.log(subjectId)
    try {
        const classes = await PostMessage.distinct('classId', { subjectId: {$eq: `${subjectId}`}});
        console.log(classes)
        res.status(200).json(classes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export default router;