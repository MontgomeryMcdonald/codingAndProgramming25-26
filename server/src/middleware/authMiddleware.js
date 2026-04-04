require("dotenv").config()
const jwt = require('jsonwebtoken')
/**
 * JWT auth middleware:
 * - Reads the Authroization header: 
 *   Standard part of request headers for logins
 *   showing continues acces through
 *  "Bearer <token>"
 * - Verifies the Token
 * - Attaches the user info to req.user <--- IMPORTANT
 */
function requireAuth(req,res,next) {
    try{
        const authHeader = req.headers.authorization || ""
        const [scheme, token] = authHeader.split(" ")

        if(scheme !== "Bearer" || !token){
            return res.status(401).json({error:"Missing or invalid Authorization Header"})
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        //Attach authenticated user to request for controllers to use
        //payload.sub = _id from mongodb
        req.user= {id:payload.sub, email: payload.email, name: payload.name, role: payload.role}
        
        next();
    }catch (err){
        return res.status(401).json({error: "Invalid or Expired Token"})
    }
}
module.exports = {requireAuth}