
import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
        
        {

                businessName: {type:String, required:true, trim:true},
                
                missionStatement: {type:String, required:true, trim:true},
                
                about: {type:String, required:true, trim:true},
                
                hours: {type:String, required:true, trim:true},
                
                menu: {type:Object, required:true, trim:true},
                
                rating: {type:Boolean, required:true, enum:[ false, false, false, false, false   ,
                false, false, false, false, false ]},
                
                reviews: {type:Object, required:true, trim:true },
                
                description: {type:String, trim:true, default:""},

                contacts: {type:Object, required:true, trim:true },

        },{timestamp:true}

)

export default mongoose.model("Business", businessSchema)
//  an enum is a schema type option that is used to restricy the values of a fiels to a predefined set

