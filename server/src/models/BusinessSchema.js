const mongoose = require('mongoose')

const  BusinessSchema = new mongoose.Schema({

        // customer info (name/email/phone/address)

        name:{type:String, required:true, trim:true, maxlength:100},
        phone:{type:String, required:true, trim:true, maxlength:20},
        address:{type:String, required:true, trim:true, maxlength:200},
        //Change this to a user object  
        hours:{type:String, required:true},
        description:{type: String, required: true, trim: true},
        ratings:{type: Number, required: true, default:0, max: 5, min: 0},
        category:{type:String, required: true, enum:["Food", "Art Supply", "Entertainment", "Services", "Trades","Miscellaneous"]}
},{timestamps:true})// timestamps



module.exports = mongoose.models.CustomOrder || mongoose.model("BusinessSchema", BusinessSchema)