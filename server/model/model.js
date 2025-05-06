import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    todo: { type: String }
})

const todoModel = mongoose.model("todos", todoSchema);

export default todoModel;