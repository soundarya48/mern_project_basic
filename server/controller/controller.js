import User from "../model/model.js";
import PostModel from "../model/Post.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// CREATE
export const postData = async (req, res) => {
  try {
    const newPost = new PostModel({ name: req.body.name });
    await newPost.save();
    res.status(201).send("Post created");
  } catch (err) {
    res.status(500).send("Error creating post");
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send("Error fetching posts");
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostModel.findByIdAndUpdate(id, { name: req.body.name });
    res.send("Post updated");
  } catch (err) {
    res.status(500).send("Error updating post");
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostModel.findByIdAndDelete(id);
    res.send("Post deleted");
  } catch (err) {
    res.status(500).send("Error deleting post");
  }
};

export const signup = async (req, res) => {
  console.log("➡️ Signup controller triggered");
  console.log("Received the data", req.body);

  const { username, email, password } = req.body;

  try {
    // 🔐 Hash the password before saving
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name: username,
      email,
      password: hashedPassword, // save the hashed password
    });

    console.log("✅ User saved:", newUser);
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error("❌ Error while saving user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  try {
    // 🔍 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 2. Compare password using async version
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('❌ Password mismatch');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 3. Sign the JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'yourFallbackSecret',
      { expiresIn: '1h' }
    );

    console.log('✅ Login successful for user:', user.email);
    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error('❌ Server error during login:', err);
    res.status(500).json({ message: "Server error during login" });
  }
};