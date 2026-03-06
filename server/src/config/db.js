const mongoose = require('mongoose')

let gfsBucket;

const connectDB = async (URI) => {
   try{
      await mongoose.connect(URI)
      const db = mongoose.connection.db

      gfsBucket = new mongoose.mongo.GridFSBucket(db, {
         bucketName: "uploads", // collection will be uploads.files + uploads.chunks
      });

      console.log("Mongo connected + GridFS bucket ready");
   }catch(err){
      throw new Error('MongoDB connection failed: ' + err.message)
   }
}

function getBucket(){
   if (!gfsBucket) throw new Error("GridFS bucket not initialized yet");
   return gfsBucket;
}

module.exports = {connectDB, getBucket};