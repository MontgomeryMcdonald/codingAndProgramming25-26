const mongoose = require("mongoose");

const customOrderFileSchema = new mongoose.Schema({
    fileId: {type: mongoose.Schema.Types.ObjectId, required: true}, // GridFS id
    filename: {type: String, required: true},
    contentType: {type: String, required: true},
    length: {type: Number},
    orderID: {type: mongoose.Schema.Types.ObjectId, ref: "CustomOrder"}, // Reference to the associated custom order
}, {timestamps: true});

module.exports = mongoose.model("CustomOrderFile", customOrderFileSchema);