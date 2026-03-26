import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authController = {
    // Registration
    async register(req, res){
        try{
            const { user_name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await userModel.createAccount(user_name, email, hashedPassword);
            res.status(201).json({message: "User registered", user: newUser});
        } catch(error){
            res.status(500).json({error: "Registration failed."});
        }
    },

    // Login
    async login(req, res){
        try{
            const {email, password} = req.body;
            const user = await userModel.login(email);

            if(!user) return res.status(404).json({error: "Email isn't Valid"});

            const isMatch = await bcrypt.compare(password, user.password_hash);
            if(!isMatch) return res.status(401).json({error: "Invalid credentials"});

            // json Token
            const token = jwt.sign({user_id: user.user_id}, process.env.jwt_passkey, {expiresIn: '24h'});

            res.json({message: "Login successful", token, user_name: user.user_name});
        }catch(error){
            res.status(500).json({error: "Login error"});
        }
    }
}

export default authController;