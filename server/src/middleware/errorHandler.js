function errorHandler(err,req,res,next){
    console.log("API Error: ", err)

    //Mongoose invalid ObjectID often triggers CastError

    if(res.headersSent) return next(err)

    if(err.name === "CastError"){
        return res.status(400).json({error:"Invalid ID Format"})
    }
    //If there are any other specific instances of errors that you want ot account for, implement them here like the one above

    res.status(500).json({error:"Server Error"})
}

module.exports = errorHandler