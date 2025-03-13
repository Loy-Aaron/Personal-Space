import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let newUser = new User({ username, email, password });

        await newUser.save();

        generateToken(newUser._id, res);

        newUser = newUser.toObject();
        delete newUser.password;
        res.status(201).json({ newUser });

    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ message: 'Email already exists' });

        console.error('Error in SignUp', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        generateToken(user._id, res);

        user = user.toObject();
        delete user.password;
        res.status(200).json({ user });

    } catch (error) {
        console.error('Error in Login', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({ message: 'Logout successful' });

    } catch (error) {
        console.error('Error in Login', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUser = (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in getting User', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

