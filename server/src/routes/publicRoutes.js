const express = require('express')
const router = express.Router()



const {
    getBusinessAll,
    getBusinessById,
    postBusiness,
    getTestimonial,
    createTestimonial    
} = require('../controllers/publicController')



router.get('/business', getBusinessAll)
router.get('/business/:id', getBusinessById)
router.post('/business', postBusiness)



router.get('/testimonials', getTestimonial)
router.post('/testimonials', createTestimonial)



module.exports = router