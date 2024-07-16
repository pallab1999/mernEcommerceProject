const ErrorHander = require("../utils/errorhander");

module.exports =(err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    //Wrong Mongodb Id error
    if(err.name==="castError"){
        const message = `Resource not Found. Invalid:${err.path}`;
        err = new ErrorHander(message,400);
    }

    // Mongoose duplicate key error
    if(err.code===1000){
        const message = `Dupllicate ${object.keys(err.keyvalue)} Entered`
        err = new ErrorHander(message,400);
    }

       //Wrong JWT  error
       if(err.name==="jsonWebTokenError"){
        const message = `Json Web Token is invalid,try again `;
        err = new ErrorHander(message,400);
    }

    // JWT expire error
    if(err.name==="TokenExpiredError"){
        const message = `Json Web Token is Expired,try again `;
        err = new ErrorHander(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });

}