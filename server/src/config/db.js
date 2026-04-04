const mongoose = require('mongoose')

let gfsBucket;

const connectDB = async (URI) => {
   try{
      await mongoose.connect(URI) // Connects to MongoDB using the provided URI
      const db = mongoose.connection.db // Get the native MongoDB driver db instance

      gfsBucket = new mongoose.mongo.GridFSBucket(db, { // Initialize GridFS bucket for file storage
         bucketName: "uploads", // collection will be uploads.files + uploads.chunks
      });

      console.log("Mongo connected + GridFS bucket ready"); // Logs a success message when connected and bucket is ready
   }catch(err){
      throw new Error('MongoDB connection failed: ' + err.message) // Throws an error if the connection fails
   }
}

function getBucket(){
   if (!gfsBucket) throw new Error("GridFS bucket not initialized yet"); // Throws an error if the bucket is not initialized
   return gfsBucket; // Returns the initialized GridFS bucket
}

module.exports = {connectDB, getBucket};