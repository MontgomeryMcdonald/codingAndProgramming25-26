const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * Auth Controller:
 * --> Register/Login
 * -->Issues JWT Token
 */

function signToken(user){
    //JWT best practices: use 'sub' for subject (user id)
    return jwt.sign(
        {id: user._id, role: user.role, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    )
    
}

// POST /api/auth/register
const register = async (req, res) =>{ // Handles user registration
    try{
        const {name, email, address, password} = req.body // Gets the required fields from the request body

        if(!name || !email || !address || !password) return res.status(400).json({error: "Missing required fields"}) // Checks for missing fields

        const normalizedEmail = email.toLowerCase().trim() // Normalizes the email for consistency and to avoid duplicates due to case or whitespace
        
        const existing = await User.findOne({email: normalizedEmail}) // Checks if the email is already in use
        if(existing) return res.status(409).json({ error: "Email already in use"}) // If it is, return error
        
        const passwordHash = await bcrypt.hash(password, 12) // Hashes the password for security

        const user = await User.create({ // Creates a new user in the database with the provided information and the hashed password and the default role of "user"
            name: name.trim(),
            email: normalizedEmail,
            address: address.toLowerCase().trim(),
            passwordHash,
            role: "user",
        });

        const token = signToken(user) // Creates a JWT token for the new user, allowing them to be logged in immediately after registration without needing to log in separately.
        
        res.status(201).json({ // Sends a success response with the token and user info
            data: {
                message: "Registered",
                token,
                user: {id: user._id, name: user.name, email: user.email, role: user.role},
            }
        })
    }catch(err){
        return res.status(500).json({message: err.message || "Server Error"}) // Returns a server error response if something goes wrong
    }
}

// POST /api/auth/login
const login = async (req, res) =>{ // Handles user login
    try{
        const {email, password} = req.body // Gets the email and password from the request body
        if(!email || !password) return res.status(400).json({error: "Email and Password are required"}) // Checks for missing fields

        const normalizedEmail = email.toLowerCase().trim()

        const user = await User.findOne({email: normalizedEmail})
        if(!user) return res.status(401).json({error: "Invalid Credentials"})
        
        const ok = await bcrypt.compare(password, user.passwordHash)
        if(!ok) return res.status(404).json({error: "Invalid Credentials"})

        const token = signToken(user)

        res.json({
            data:{
                message: "Logged in",
                token,
                user:{id: user._id, name: user.name, email: user.email},
            }
        })
    }catch(err){
        return res.status(500).json({message: err.message || "Server Error"})
    }
}
module.exports = {signToken, register, login}