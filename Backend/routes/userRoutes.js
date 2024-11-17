const express=require("express");
const { isAuthenticate } = require("../middleware/verifyToken");
const {getuserbysidebar}=require("../controller/userController");
const router=express.Router();

router.get("/user/user",isAuthenticate,getuserbysidebar)

module.exports=router