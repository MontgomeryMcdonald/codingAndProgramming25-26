const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name:{type: String, required:true},
    rating:{type:Number, enum:[1, 2, 3, 4, 5], default: 1},
    message:{required: false, type: String, maxLength:1000},
    aproved:{type: Boolean, required:true}
},{timestamps:true})


module.exports = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema)