const Business = require('../models/BusinessSchema')
const Testimonial = require('../models/Testimonial')

// GET BUSINESS

async function getBusinessAll(req, res){
    try{
        const users = await Business.find().sort({createdAt: -1})
        res.json({data:users})
    }catch (err){
        console.error(err)
    }
}


// GET BUSINESS BY ID

async function getBusinessById(req, res, next) {
  try {
    const business = await Business.findById(req.params.id)
    if (!business || business.isDeleted) return res.status(404).json({ message: "User not found" })
    res.json({ data: business })
  } catch (err) {
    next(err)
  }
}

// POST BUSINESS
async function postBusiness(req, res)
{
     try{
         const {name, phone, address, hours, description} = req.body // Gets the required fields from the request body
 
         if(!name || !phone || !address || !description || !hours) return res.status(400).json({error: "Missing required fields"}) // Checks for missing fields

 
         const myBusiness = await Business.create({ // Creates a new user in the database with the provided information and the hashed password and the default role of "user"
             name: name.trim(),
             phone: phone,
             address: address.toLowerCase().trim(),
             hours:hours,
             description:description
         });
 
         res.status(201).json({ // Sends a success response with the token and user info
             data: {
                 message: "Registered",
                 user: {id: myBusiness._id, name: myBusiness.name, phone: myBusiness.phone, address: myBusiness.address, hours: myBusiness.address},
             }
         })
     }catch(err){
         return res.status(500).json({message: err.message || "Server Error"}) // Returns a server error response if something goes wrong
     }   
}

const getTestimonial = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({})
        if(!testimonials || testimonials.length === 0){
            return res.status(404).json({message: 'There are no testimonials'})
        }
        return res.json(testimonials)
    } catch (error) {
        next(error)
    }
}

// POST /api/public/testimonials (Create's a testimonial with the pending status ) 
const createTestimonial = async (req, res, next) => {
    try {
        const incomingTestimonial = req.body
        if(!incomingTestimonial || Object.keys(incomingTestimonial).length === 0){
            return res.status(404).json({message:'Missing information'})
        }
        const testimonials = await Testimonial.create(incomingTestimonial)
        return res.status(201).json({testimonials})
    } catch (error) {
        next(error)
    }
}

module.exports = {getBusinessAll, getBusinessById, postBusiness, getTestimonial, createTestimonial}