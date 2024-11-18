const user = require("../model/user")

exports.getuserbysidebar=async(req,res,next)=>{
    try{
        const loggeninUser=req.user.id
        const alluserexpceptuser= await user.find({
            _id:{$ne:loggeninUser},
        }).select("-password")

        res.status(200).json(alluserexpceptuser)
    }
    catch(error){
        console.log(error)
        res.status(400).json({ success: false, error: "in get user by id" + error.message });
        next(error)
    }
}