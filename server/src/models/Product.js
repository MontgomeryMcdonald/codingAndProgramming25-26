const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {

        id:{type:Number, required: true, trim:true},
        name: {type: String, required: true, maxlength: 100},

        // *** slug = unique URL with no spaces used as the URL to navigate to the item
        slug: {type: String, required: true, maxlength: 50},
        
        description: {type: String, required: true, maxlength: 100},

        color:{type:String, trim:true, enum:['red','blue','yellow','orange','purple', 'green'], default:'red'},
        material:{type:String, trim:true, enum:['Nylon','PLA','ABS'], default:'Nylon'},
        
        image:{type:String, trim:true, required:true},
        
        price: {type: Number, required: true},
        category: {type: String, enum: ['miniatures', 'prototypes', 'functional-parts', 'decorative', 'toys', 'organizers'], default: 'miniatures'},
        inStock: {type: Boolean, default: true},
        featured: {type: Boolean, default: true}

    },
    {timestamps: true}
    
)

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema)