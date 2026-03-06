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
        {email:user.email, name:user.name,},
        process.env.JWT_SECRET,
        {subject:String(user._id), expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    )
    
}

// POST /api/auth/register
async function register(req,res,next) {
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(409).json({error:"name, email, password"})
        }
        const existing = await User.findOne({ email: email.toLowerCase() })
        if (existing) return res.status(409).json({ error: "Email already in use"})
        
        const passwordHash = await bcrypt.hash(password, 12)

        const created = await User.create({
            name,
            email: email.toLowerCase(),
            passwordHash
        });
        const token = signToken(created)
        
        //This is so that the site doesn't need to decode the token to find a user.
        //The token is only for the server for verification. Front-end should not be decrypting everything.
        res.status(201).json({
            data: {
                token,
                user: { id: created._id, name: created.name, email: created.email}
            }
        })

    }catch(err){
        next(err)
    }
}

// POST /api/auth/login
async function login(req,res,next) {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({error: "Email and Password are required"})
        }

        const user = await User.findOne({email:email.toLowerCase()})
        if(!user) return res.status(401).json({error: "Invalid Credentials"})
        
        const ok = await bcrypt.compare(password, user.passwordHash)
        if(!ok) return res.status(404).json({error:"Invalid Credentials"})
        // Invalid Credentials is there to avoid lawsuits, as telling people which one is wrong reduces possible outcomes

        const token = signToken(user)
        //sends this back to the user
        res.json({
            data:{
                token,
                user:{id: user._id, name: user.name, email: user.email},
                what:{stuff: "Successful Login"}
            }
        })
    }catch(err){
        next(err)
    }
}
module.exports = {signToken, register, login}