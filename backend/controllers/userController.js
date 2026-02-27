import bcrypt from "bcryptjs";
import User from "../models/user.js"
import createToken from "../utils/createToken.js"
import asyncHandler from "../middlewares/asyncHandler.js";


const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        throw new Error('Please provide username, email and password.');
    }

    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400).send("User already exists.")
    }

    // Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password: hashedPassword});


    try {

        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    }
    catch (error) {
        res.status(400)
        throw new Error('Invalid user data.')
    }
    
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw new Error('Please provide email and password.');
    }

    const existingUser = await User.findOne({email});

    if(!existingUser) {
        throw new Error(`No user found with mail: ${email}`)
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);

    if(isValidPassword) {
        createToken(res, existingUser._id);
        res.status(201).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        })
    }
    else {
        res.status(401).json({message: 'Invalid Password'})
    }
    
});

const logOutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged out successfully."})
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.json(users)
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const userId =  req.user._id;
    const user = await User.findById(userId); 

    if(user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }
    else {
        res.status(404).json({message: "User not found."})
        return;
    }
});

const updateCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(salt, req.user.password);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else {
        res.status(404)
        throw new Error("User not found.")
    }
})

export { createUser, loginUser, logOutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUser };