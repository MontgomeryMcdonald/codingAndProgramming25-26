const mongoose = require("mongoose");
const {getBucket} = require("../config/db");

const getFile = async (req, res, next) => {
    try{
        const bucket = getBucket();

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({message: "Invalid file id"});
    
        const fileId = new mongoose.Types.ObjectId(req.params.id);

        const files = await bucket.find({_id: fileId}).toArray();
        if(!files || files.length === 0) return res.status(404).json({message: "File not found"});
    
        const file = files[0];

        res.set("Content-Type", file.contentType || "application/octet-stream");
        res.set("Content-Disposition", `inline; filename="${file.filename}"`);

        bucket.openDownloadStream(fileId).pipe(res);
    }catch(err){
        next(err)
    }
}

module.exports = {getFile};
