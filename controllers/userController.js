import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler";
import { User } from "../models/usersModel.js"

// @desc Register new user
// @route POST /users/:id
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error ("All fields are required. Please fill-up all the fields!");
    }

    // Check if user exists
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error ("User already exists!");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    try {
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
    
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                token: generateToken(user._id),
          });
        } else {
            res.status(400);
            throw new Error("Invalid user data!");
        }
      } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Internal server error!");
      };
});

// @desc Authenticate/Login a user
// @route POST /users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Check for user by using email
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            message: "Successfully logged in!",
            _id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            token: generateToken(user._id),
      });
    } else {
        res.status(400);
            throw new Error("Invalid email or password!");
    };
});

// @desc Get user data
// @route GET /users/me
// @access Public
export const getUserData = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email} = await User.findById(req.user.id);

    
    res.status(200).json({
        id: _id,
        firstName: firstName,
        lastName: lastName,
        email: email,
    });
});

// Generate a token using JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
