const express=require("express");
//const User=require("../model/user");
const user = require("../model/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const { errorHandler } = require("../utils/errorHandler");
const bcryptjs = require("bcryptjs");

exports.signup=async(req,res,next)=>{
    try{

        const {username,email,password,confrimPassword,gender}=req.body
        
        const existUser=await user.findOne({email})

        if(existUser){
           return next(errorHandler(400,"User already exist"))
        }

        if(password !== confrimPassword){
           return next(errorHandler(400,"user password not match"))
        }

        let hashPassword;
         hashPassword=bcrypt.hashSync(password,10);

         const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
         const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`


        const newUser= new user({
            username,email,password:hashPassword,
            profilepic: gender ==="male" ? boyprofilepic : girlprofilepic,
        })

        try{
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)

            await newUser.save()

            res.cookie("token",token,{httpOnly:true}).status(201).json({
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email,
                profilepic:newUser.profilepic,
            })

        }
        catch(err){
            console.log(err);
            return res.status(401).json({
                success:false,
                message:"error jwt part",err,
            });
        }


        
    }
    catch(error){
        next(error)
    }
}

exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;

        const validUser= await user.findOne({email})

        if(!validUser){
            return next(errorHandler(404,"User not found"))
        }

        const validPassword=bcryptjs.compareSync(password,validUser.password)

        if(!validPassword){
            return next(errorHandler(401,"Wrong passwrod"))
        }

        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)

        res.cookie("token",token,{httpOnly:true}).status(201).json({
            _id:validUser._id,
            username:validUser.username,
            email:validUser.email,
            profilepic:validUser.profilepic,
        })
        console.log("Request received at /api/login");
        console.log("Request Headers:", req.headers);
    
        // Your login logic here
        res.status(200).json({ message: "Login successful!" });
    }
    catch(error){
        next(error)
    }

}

exports.logout=async(req,res,next)=>{
    try{

        res.clearCookie("token")

        res.status(200).json({
            message:"User  has been logged out Successfully"
        });
    }
    catch(error){
        next(error)
    }

}