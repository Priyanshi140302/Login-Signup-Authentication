const bcrypt = require('bcrypt')
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');


const signup = async(req,res)=>{
try {
    const {name, email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        return res.status(409)
        .json({message:'User is already exist, you can login', success:false})
    }
    const userModel = new UserModel({name, email, password});
    userModel.password = await bcrypt.hash(password,10);
    await userModel.save();
    res.status(201)
    .json({
        message:"Signup successfully",
        success:true
    })
} catch (error) {
    res.status(500)
    .json({
        message:"Internal server error",
        success:false
    })
}
}

// const login = async(req,res)=>{
//     try {
//         const { email, password} = req.body;
//         const user = await UserModel.findOne({email});
//         console.log("user",user);
//         const errMessage = 'Auth failed email or password is wrong';
//         if(!user){
//             return res.status(403)
//             .json({message:errMessage, success:false});
//         }
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if(!isPassEqual){
//             return res.status(403)
//             .json({message: errMessage, success:false});
//         }
//         const jwtToken = jwt.sign(
//             {email:user.email,_id:user._id},
//             process.env.JWT_SECRET,
//             {expiresIn:'24h'}
//         )
//         res.status(201)
//         .json({
//             message:"Login successfully",
//             success:true,
//             jwtToken,
//             email,
//             name: user.name
//         })
//     } catch (error) {
//         res.status(500)
//         .json({
//             message:"Internal server error",
//             success:false
//         })
//     }
//     }

const login = async (req, res) => {
    try {
      // Check if body parsing is successful
      console.log("Request Body:", req.body);
  
      const { email, password } = req.body;
  
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({
          message: 'Email and password are required',
          success: false
        });
      }
  
      // Find user by email
      const user = await UserModel.findOne({ email });
  
      console.log("User Found:", user);
  
      const errMessage = 'Authentication failed: Incorrect email or password';
  
      // If user not found, return error
      if (!user) {
        return res.status(403).json({ message: errMessage, success: false });
      }
  
      // Compare provided password with stored hashed password
      const isPassEqual = await bcrypt.compare(password, user.password);
  
      if (!isPassEqual) {
        return res.status(403).json({ message: errMessage, success: false });
      }
      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
      );
      res.status(201).json({
        message: "Login successful",
        success: true,
        jwtToken,
        email,
        name: user.name
      });
    } catch (error) {
      console.error("Login Error:", error);
  
      res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  };
  

module.exports = {
    signup,
    login
}