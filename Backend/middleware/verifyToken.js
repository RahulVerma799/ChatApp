const { errorHandler } = require("../utils/errorHandler")
const jwt =require("jsonwebtoken");

exports.isAuthenticate=async(req,res,next)=>{
    try{

        const token=req.cookies.token

        if(!token){
            return next(errorHandler(401,"Unauthorized: No token provided"))
        }

        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return next(errorHandler(403,"Forbiiden"))
            }

            req.user=user

            next()
        })
    }
    catch(error){
        console.error("Authentication error:", error);
        return next(errorHandler(500, "Internal Server Error"));

    }
}