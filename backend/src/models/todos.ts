import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: false,
        default: "untitled"
    },
    status: {
        type: String,
        required: false,
        default: "To do",
    },
    dueDate: {
        type: String,
        required: false,
        default: "none"
    },
    createdBy:{
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: false,
        default: "none"
    },
    tickedComplete:{
        type: Boolean,
        required: false,
    }
})

export const Todo = mongoose.model("Todos" , todoSchema )