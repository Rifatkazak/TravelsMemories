
import mongoose from 'mongoose';
import express from 'express';
import PostMessage from "../models/postsMessages.js";

const router = express.Router();

export const getPosts = async (req, res) =>  {
    const { page } = req.query;
    try {
        const _limit = 2 ;
        const startIndex = (Number(page) -1 ) * _limit;
        const total = await PostMessage.countDocuments({})
        const posts = await PostMessage.find().sort({_id:-1}).limit(_limit).skip(startIndex); // tesr sıralama

        res.status(200).json({data:posts, currentPage:Number(page), numberOfPages : Math.ceil(total / _limit)}); // 200 OK
    } catch (error) {
        res.status(404).json({message:error.message}); // 404 Not Found
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

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;


    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({...post, creator:res.userId, createdAt: new Date().toISOString()})

    try {
        await newPostMessage.save()

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
// Update post
export const updatePost = async (req, res) => {
    const {id : _id} = req.params;  // /posts/12 => 12 is id in params - _id used in mongoose
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post , {new: true});

    res.json(updatedPost);

}
// Delete post
export const deletePost = async (req, res) => {
    const {id } = req.params;  // /posts/12 => 12 is id in params - _id used in mongoose
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted successfully'});

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message:"Unauthenticated"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;


    const post = await PostMessage.findById(id);


    post.comments.push(value);


    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;