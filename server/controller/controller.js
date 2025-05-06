
import todoModel from "../model/model.js";

// Create Item
export const postData = async (req, res) => {
    try {
        const newItem = new todoModel(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Items
export const getItems = async (req, res) => {
    try {
        const items = await todoModel.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Item
export const updateItem = async (req, res) => {
    try {
        const updatedItem = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Item
export const deleteItem = async (req, res) => {
    try {
        await todoModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};