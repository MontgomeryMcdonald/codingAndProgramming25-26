require("dotenv").config()

const express = require("express")
const cors = require("cors")

const {connectDB} = require("./src/config/db")
const authRoutes = require("./src/routes/authRoutes")
const publicRoutes = require("./src/routes/publicRoutes")
const adminRoutes = require('./src/routes/adminRoutes')
const errorHandler= require("./src/middleware/errorHandler")
const { connect } = require("mongoose")



const app = express()

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Credentials'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true})) // Parses Form data for login if needed


// Health Check
app.get('/api/health', (req,res)=> res.json({ok:true}))

// Routes



app.use('/api/auth', authRoutes)
app.use('/api/public', publicRoutes)
app.use('/api/admin', adminRoutes)


//Error middleware goes last
app.use(errorHandler)

// Test
app.get('/', (req, res, next) => {res.redirect('http://localhost:3000/products')})

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGODB_URI).then(() =>{
    app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))
})  