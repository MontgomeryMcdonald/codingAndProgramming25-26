const express = require('express')
const router = express.Router()

const {requireAuth} = require('../middleware/authMiddleware')
const {requireAdmin} = require('../middleware/adminMiddleware')

const{
    getAllUsers,
    deleteUser,
    getAllProducts,
    deleteProductAsAdmin
} = require('../controllers/adminController')
router.use(requireAuth)
router.use(requireAdmin)

router.get('/users', getAllUsers)
router.get('/products', getAllProducts)
router.delete('/users/:id', deleteUser)
router.delete('/products/:id', deleteProductAsAdmin)

module.exports= router