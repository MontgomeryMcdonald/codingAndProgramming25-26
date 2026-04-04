const Product = require('../models/Product')
const Custom = require('../models/CustomOrder')
const Testimonial = require('../models/Testimonial')
const {Readable} = require("stream")
const {getBucket} = require('../config/db')


// GET /api/public/products (Filter/Search)
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        if(!products || products.length === 0){
            return res.status(404).json({message: 'There are no products'})
        }
        return res.json(products)
    } catch (error) {
        return res.status(500).json({message: error.message || String(error)})
    }
}

// GET /api/public/products/:id (Filter/Search)
const getProductById = async (req, res, next) => {
    try {
        // gets a product from the Id
        const product = await Product.findOne({_id:req.params.id})
        if(!product){
            res.status(404).json({message: 'There is no product'})
        }
        res.json(product)
    } catch (error) {
        res.status(404).json({message: error})
    }
}

// GET /api/public/customs (Filter/Search)
const getCustom = async (req, res, next) => {
    try {
        const customs = await Custom.find({})
        if(!customs || customs.length === 0){
            return res.status(404).json({message: 'There are no customs'})
        }
        return res.json(customs)
    } catch (error) {
        return res.status(500).json({message: error.message || String(error)})
    }
}

// GET /api/public/products/by-slug?slug=...  To-Do


// POST /api/public/custom-orders (Creates a custom order)
const createCustom = async (req, res, next) =>{
    try {
        const data = req.body // Gets the data from the request body, which contains the information for the custom order

        if(!data || Object.keys(data).length === 0) return res.status(400).json({message:'Missing information'})
        // If there is no data or the data is empty, return an error message

        const custom = await Custom.create(data) // Creates a new custom order in the database using the provided data and waits for it to be saved

        return res.status(201).json({custom}) // Returns a success response with the created custom order
    } catch (error) {
        return res.status(400).json({message: error.message || String(error)}) // Returns an error if something goes wrong
    }
}

// POST /api/public/custom-orders/file (Handles file uploads for custom orders)
const createCustomFile = async (req, res, next) =>{
    try{
        if(!req.file) return res.status(400).json({message: 'No file uploaded'}) // If no file is uploaded, return an error message
        
        const bucket = getBucket(); // Get the GridFS bucket instance from the database configuration, which is used to interact with files stored in MongoDB using GridFS

        const readableStream = Readable.from(req.file.buffer); // Creates a readable stream from the uploaded file's buffer, which allows us to pipe the file data into the GridFS upload stream for storage in MongoDB

        const uploadStream = bucket.openUploadStream(req.file.originalname, { // Opens an upload stream in the GridFS bucket with the original filename and metadata for the file being uploaded
            contentType: req.file.mimetype,
            metadata: {field: req.file.fieldname},
        });

        const fileId = uploadStream.id; // Gets the ID of the file being uploaded
        let responded = false; // Used to prevent multiple responses in case of errors or multiple events

        uploadStream.on("error", (err) =>{
            if(responded || res.headersSent) return; // If a response has already been sent or the headers have been sent
            responded = true; // Sets responded to true to prevent further responses
            return res.status(500).json({message: "Upload failed", error: err.message}); // Returns an error response if the upload fails
        });
        
        uploadStream.on("finish", () =>{
            if(responded || res.headersSent) return;
            responded = true;
            return res.status(201).json({message: "Uploaded", file: {id: uploadStream.id}});    
        });

        readableStream.pipe(uploadStream); // Pipes the readable stream of the file data into the GridFS upload stream, which handles the actual storage of the file in MongoDB
    }catch(err){
        if(res.headersSent) return;
        return res.status(500).json({message: "Server error", error: err.message || String(err)});
    }
}


// GET /api/public/testimonials (Gets the testimonials with the approved status)
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

const SignUp = async (req,res, next) => {
    try {
        
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

module.exports = {getProducts, getProductById, getCustom, createCustom, getTestimonial, createTestimonial, createCustomFile}
