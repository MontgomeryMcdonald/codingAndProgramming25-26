const mongoose = require("mongoose");
const {getBucket} = require("../config/db");

const getFile = async (req, res, next) => {
    try{
        const bucket = getBucket(); // Get the GridFS bucket instance from the database configuration, which is used to interact with files stored in MongoDB using GridFS

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({message: "Invalid file id"}); // Validates the file ID provided in the request parameters to ensure it is a valid MongoDB ObjectID
    
        const fileId = new mongoose.Types.ObjectId(req.params.id); // Converts the file ID from the request parameters into a MongoDB ObjectID, which is necessary for querying the files in GridFS

        const files = await bucket.find({_id: fileId}).toArray(); 
        // Queries the GridFS bucket for a file with the specified ID and converts the result to an array
        // We convert the result to an array because the find method returns a cursor, and we want to check if any files were found first before doing anything

        if(!files || files.length === 0) return res.status(404).json({message: "File not found"}); // Error message if no files were found
    
        const file = files[0]; // Since the ID is unique, we can safely take the first file from the array as the one we want to serve

        // Headers for the file
        res.set("Content-Type", file.contentType || "application/octet-stream"); // Sets the Content-Type header to the file's content type if available
        res.set("Content-Disposition", `inline; filename="${file.filename}"`); // Tells the browser to display the file inline if possible, and also provides a filename for the file being served
    }catch(err){
        next(err)
    }
}

module.exports = {getFile};