
const express=require('express');
const User = require('../models/user.jsx');
const router=express.Router();
const{editProfileValidator}=require('../utils/authValidator.js')


router
.get('/',async(req,res)=>{
 const user=req.user
  res.json({message:"successfully verify token See Profile",user:user})
})



.patch("/",async(req,res)=>{
    try{
        editProfileValidator(req)
           const {user}=req;
    const {_id}=user

    const updatedUser= await User.findByIdAndUpdate(_id,{name:req.body.name},{new:true})
    res.status(200).send({message:"Successful profile update",user:updatedUser})
    }
    catch(error){
              res.status(400).json("Sometime went wrong : " + error.message);

    }
 
});

module.exports=router