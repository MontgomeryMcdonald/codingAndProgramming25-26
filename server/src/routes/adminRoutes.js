const express = require('express')
const router = express.Router()

const {requireAuth} = require('../middleware/authMiddleware')
const {requireAdmin} = require('../middleware/adminMiddleware')

const{
    getAllUsers,
    deleteUser,
} = require('../controllers/adminController')
router.use(requireAuth)
router.use(requireAdmin)

router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)

module.exports= router