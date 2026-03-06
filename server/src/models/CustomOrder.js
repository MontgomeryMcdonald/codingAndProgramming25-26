const mongoose = require('mongoose')

const customOrderSchema = new mongoose.Schema({

        // customer info (name/email/phone/address)

        name:{type:String, required:true, trim:true, maxlength:100},
        email:{type:String, required:true, trim:true, maxlength:100},
        phone:{type:String, required:true, trim:true, maxlength:20},
        address:{type:String, required:true, trim:true, maxlength:200},
        //Change this to a user object

        // description, preferences (color/material/size)
        description:{type:String, required:true, trim:true, maxlength:1000},
        
        // preferences
        color:{type:String, trim:true, enum:['red','blue','yellow','orange','purple', 'green'], default:'red'},
        material:{type:String, trim:true, enum:['Nylon','PLA','ABS'], default:'Nylon'},
        size:{type:String, required:true, trim:true, maxlength:100},

        // GridFS reference
        fileId: { type: mongoose.Schema.Types.ObjectId, required: true },

        // status (Submitted/Reviewed/Quoted/In Progress/Completed)
        status:{type:String,enum:['Pending','In Progress', 'Ready', "Completed", "Cancelled"], default:'Pending'},

        // internal notes, assigned student/printer (optional)
        notes:{type:String, required:false, default:'no notes'},
        printer:{type:String, required:false, default:'terry'}

        
},{timestamps:true})// timestamps



module.exports = mongoose.models.CustomOrder || mongoose.model("CustomOrder", customOrderSchema)