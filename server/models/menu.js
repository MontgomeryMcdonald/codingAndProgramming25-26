
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
        
        {

                item: {type:String, required:true, trim:true},

                price: {type:String, required:true, trim:true},

                img: {type:String, required:true, trim:true},

                description: {type:String, required:true, trim:true}

        },{timestamp:true}

)

export default mongoose.model("MenuData", menuSchema)