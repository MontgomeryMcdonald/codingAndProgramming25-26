const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(), // Uses memory storage to store uploaded files in memory as Buffer objects
    limits: {fileSize: 20 * 1024 * 1024} // Limit file size to 20MB
})

module.exports = upload;