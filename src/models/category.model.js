import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    level: {
        type: Number,
        required: true,
    },
});

export const Category = mongoose.model("Category",categorySchema);