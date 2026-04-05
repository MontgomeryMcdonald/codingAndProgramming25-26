/**
 * Admin Controller
 * 
 * - Admin only endpoints to view/manage all users and courses
 * 
 * All routes using these controllers should be protected with:
 * -requireAuth
 * -requireAdmin
 */

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Business = require('../models/BusinessSchema')
function signToken(user){
    //JWT best practices: use 'sub' for subject (user id)
    return jwt.sign(
        {email:user.email, name:user.name,},
        process.env.JWT_SECRET,
        {subject:String(user._id), expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    )
    
}

//GET /api/admin/users
async function getAllUsers(req, res, next){
    try{
        const users = await User.find().select("-passwordHash").sort({createdAt: -1})
        res.json({data:users})
    }catch (err){
        next(err)
    }
}

//DELETE /api/admin/users/:id
//Deletes the user and any businesses they own/run
async function deleteUser(req,res,next){
    try {
        const targetId = req.params.id

        if(String(targetId)===String(req.user.id)){
            return res.status(400).json({error:"You cannot delete your own admin account"})
        }

        // deletes the user with the given ID and returns its contents
        const deletedUser = await User.findByIdAndDelete(targetId)
        if(!deletedUser){
            // runs if the deleted user is null, which means nobody was deleted -- there is no user of targetID
            return res.status(404).json({error:"User Not Found"})
        }
        // deletes all businesses the user owns
        await CustomOrder.deleteMany({owner: targetId})
        res.json({data:{deletedUser:targetId}})
    } catch (error) {
        next(error)
    }
}





//GET /api/admin/courses
//Include populate for owner, name email role
//Sort data ascending order

//Change this to work for our things
module.exports = {deleteUser, getAllUsers}