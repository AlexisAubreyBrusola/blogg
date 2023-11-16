import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: [true, "Field is required. Please add a first name"]
    },
    lastName: {
        type: String, required: [true, "Field is required. Please add a last name"]
    },
    email: {
        type: String, required: [true, "Field is required. Please enter an email"],
        unique: true
    },
    password: {
        type: String, required: [true, "Field is required. Please enter a password"]
    }
},
{
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);