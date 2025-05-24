import express from 'express';
import { signup, login, postData, getPosts, updatePost, deletePost } from '../controller/controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const route = express.Router();

// Auth routes
route.post("/signup", signup);
route.post("/login", login);

// Profile route
route.get('/profile', verifyToken, async (req, res) => {
  res.json({ message: 'Welcome to your profile!', userId: req.user.id });
});

// CRUD routes for Todo
route.post("/posts", postData);           // CREATE
route.get("/posts", getPosts);            // READ
route.put("/posts/:id", updatePost);      // UPDATE
route.delete("/posts/:id", deletePost);   // DELETE

export default route;
