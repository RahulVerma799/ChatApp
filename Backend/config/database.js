const mongoose= require("mongoose");

exports.connectDb=()=>{
    mongoose.connect(process.env.Mongo_Url,{})

    .then(()=>{
        console.log("Database is cconeted");
    })
    .catch((error)=>{
        console.log("error is coonnection",error);
    });
};

//mongodb+srv://rahul27102710:rahul2710@cluster0.zfsgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0