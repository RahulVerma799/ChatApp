const user = require("../model/user")

exports.getuserbysidebar=async(req,res,next)=>{
    try{
        const loggeninUser=req.user.id
        const alluserexpceptuser= await user.find({
            _id:{$ne:loggeninUser},
        }).select("-password")

        res.status(400).json(alluserexpceptuser)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}