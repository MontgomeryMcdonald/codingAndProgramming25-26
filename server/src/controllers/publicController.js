const Product = require('../models/Product')
const Custom = require('../models/CustomOrder')
const Testimonial = require('../models/Testimonial')
// const FileModel = require('../models/CustomOrderFile')
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
        const data = req.body

        if(!data || Object.keys(data).length === 0){
            return res.status(400).json({message:'Missing information'})
        }

        const custom = await Custom.create(data)

        console.log("content-type:", req.headers["content-type"]);
        console.log("body keys:", req.body && Object.keys(req.body));

        return res.status(201).json({custom})
    } catch (error) {
        return res.status(400).json({message: error.message || String(error)})
    }
}

// POST /api/public/custom-orders/file (Handles file uploads for custom orders)
const createCustomFile = async (req, res, next) =>{
    try{
        if(!req.file){
            return res.status(400).json({message: 'No file uploaded'})
        }
        const bucket = getBucket();

        const readableStream = Readable.from(req.file.buffer);

        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype,
            metadata: {field: req.file.fieldname},
        });

        const fileId = uploadStream.id;

        let responded = false;

        uploadStream.on("error", (err) =>{
            if(responded || res.headersSent) return;
            responded = true;
            return res.status(500).json({ message: "Upload failed", error: err.message});
        });
        
        uploadStream.on("finish", () =>{
            if(responded || res.headersSent) return;
            responded = true;

            return res.status(201).json({message: "Uploaded", file: {id: uploadStream.id}});    
        });

        readableStream.pipe(uploadStream);
    }catch(err){
        if(res.headersSent) return;
        return res.status(500).json({message: "Server error", error: err.message });
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
