import { name } from "ejs";
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
        
        {

                rating: {type:String, required:true, trim:true},
                
                name: {type:String, required:true, trim:true},
                
                profilePicture: {type:String, trim:true, default:"https://res-console.cloudinary.com/dzu7xnmgw/thumbnails/v1/image/upload/v1761774670/YmxhbmstcHJvZmlsZS1waWN0dXJlLTk3MzQ2MF82NDBfZ2oxZWRy/preview"},
                
                review: {type:String, required:true, trim:true}


        },{timestamp:true}

)


export default mongoose.model("Review", reviewSchema)