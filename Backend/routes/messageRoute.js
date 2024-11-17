const express=require("express");
const {getMessage}=require("../controller/messageController");

const  {isAuthenticate }= require ("../middleware/verifyToken");
const {sendMessage}=require("../controller/messageController");

const router=express.Router();

router.get("/get/:id",isAuthenticate,getMessage)
router.post("/send/:id",isAuthenticate,sendMessage)

module.exports=router;