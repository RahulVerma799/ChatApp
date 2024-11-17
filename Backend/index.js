const express=require("express");
const { server,app } = require("./socket/socket");
//const app=express();

require("dotenv").config();

const PORT=process.env.PORT ||4000;

require("./config/database").connectDb();

app.get("/",(req,res)=>{
    res.send("helo world")
});

app.use(express.json());

const cookieparser=require("cookie-parser");
app.use(cookieparser());

server.listen(PORT,()=>{
    console.log(`ok listen it ${PORT}`);
})




const auth=require("./routes/auth");
app.use("/api",auth)

const messageRouter=require("./routes/messageRoute");
app.use("/api",messageRouter)

const userRoutes=require("./routes/userRoutes");

app.use("/api",userRoutes)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "Intername server error"

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})