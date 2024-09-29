const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("MongoDB Connected...")
}).catch((err)=>{
    console.log("MongoDB Connection Error:",err);
})
//Priyanshi@123
//mongodb+srv://Priyanshi140302:<db_password>@cluster0.yt64y.mongodb.net/