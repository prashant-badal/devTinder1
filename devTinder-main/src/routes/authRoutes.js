const express = require("express");
const router = express.Router();
const User = require("../models/user.jsx");
const bcrypt = require('bcrypt');


const {authValidatorSignUp,authValidatorLogin}=require("../utils/authValidator.js")

router
  .get("/", async (req, res) => {
    const users = await User.find();
    console.log(users);
    res.json(users);
  })

  .post("/signup", async (req, res) => {


    try {
      
      authValidatorSignUp(req);
    
      const body1=req.body
      const alreadexistUser = await User.find({ email: body1.email });

      if (alreadexistUser.length > 0) {
        throw new Error ("Invalid Crediential")
      } 
      
    const  hashPassword= await bcrypt.hash(body1.password, 10) 

       console.log("body", hashPassword);
        const users = await User.create({name:body1.name,password:hashPassword,email:body1.email});
             res.status(200).json({message:`hi ${body1.name} "Successful Account is Created`});

    
}
   catch (error) {
      res.status(400).json({message:"Sometime went wrong", error:error.message});
    }
  })

  .patch("/", async (req, res) => {

    try {
      const body1 = req.body;
       const  AllowedField =["name","phone","useID"];
     const isADddData= Object.keys(body1).every((k)=>{
      return  AllowedField.includes(k)
      })
      if(!isADddData){
        throw new Error(" ADDing new not allow")
      }

    const users = await User.findByIdAndUpdate(useID,{name:body1.name,phone: body1.phone},{returnDocument:"after",runValidators:true});
    console.log("update",users)
    res.status(201).json({message:"update", users});

}
catch(error){
      res.status(400).json("Sometime went wrong"+ error.message);

}
})

  .delete("/", async (req, res) => {
    const useID = req.body;

    try {
      const users = await User.findOneAndDelete(useID);
      res.json({ message: "delete successful", users });
    } catch (error) {
      res.status(400).json("Sometime went wrong");
    }
  })
.post("/login",async(req,res)=>{
  try{
    authValidatorLogin(req)

    const body1=req.body
      const alreadexistUser = await User.find({ email: body1.email });

      if (alreadexistUser.length <= 0) {
        throw new Error ("Invalid Crediential")
      } 

      const hassPasswordDB= alreadexistUser[0].password
      console.log(hassPasswordDB)
      
   const isPassword = await bcrypt.compare(body1.password, hassPasswordDB)

   if(!isPassword){
        throw new Error ("Invalid Crediential")

   }
   else{
          res.status(200).json({message:`hi ${body1.email} "Successfully Login!`});

   }

  }
  catch (error) {
      res.status(400).json("Sometime went wrong : " + error.message);
    }


  
   

})
  

module.exports = router;
