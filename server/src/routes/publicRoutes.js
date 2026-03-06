const express = require('express')
const router = express.Router()
const upload = require("../middleware/uploadMemory");

const {
    getProducts,
    getProductById,
    createCustom,
    createCustomFile,
    getCustom,
    getTestimonial,
    createTestimonial
} = require('../controllers/publicController')

const {getFile} = require('../controllers/fileController')

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
// router.get('/products/by-slug', getProducts) //Fill when slug funciton is completed
router.get('/customs', getCustom)
router.post('/custom-orders', createCustom)
router.post('/custom-orders/file', upload.single('file'), createCustomFile) // Endpoint for file uploads
router.get("/files/:id", getFile);
router.get('/testimonials', getTestimonial)
router.post('/testimonials', createTestimonial)

module.exports = router