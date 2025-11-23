
const jwt=require('jsonwebtoken');
const User=require('../models/user.jsx')


const adminAuth= async(req,res,next)=>{
  try{

    const {token}=req.cookies
    if(!token){
        throw new Error("Invalid Token !")
    }
    const decodedToken=await jwt.verify(token,"BAdal123")
    const {_id}=decodedToken
    console.log("TokenID",decodedToken)

    const user=await User.findById(_id)
    if(!user){
        throw new Error("Invalid User")
    }

   req.user=user
    next()
    

  }
  catch(error){
    res.status(400).json({message:"Sometime went wrong",error:error.message})
  }
};

module.exports={adminAuth};