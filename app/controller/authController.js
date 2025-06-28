import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { use } from 'react';



export const checkAuth = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: req.user

        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token verification failed',
            error: error.message
        });
    }
}


const register = async (req, res) => {

    const { name, email, password, role } = req.body;
    try {

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'Developer' // Default role is 'Developer' if not provided
        });
        // Save the user to the database
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(400).json({ message: "User does not exist" });
        };
        const isPassValid = await bcrypt.compare(password, existUser.password);
        if (!isPassValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        //crate a token

        const token = jwt.sign({
            UserId: existUser._id,
            email: existUser.email,
            role: existUser.role
        },
            process.env.JWT_SECRET,
            { expiresIn: '1d' })

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: existUser._id,
                name: existUser.name,
                email: existUser.email,
                role: existUser.role
            }
        })
    } catch (error) {

        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export { login, register };  