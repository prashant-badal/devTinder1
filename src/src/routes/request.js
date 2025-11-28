const express=require('express')
const ConnectionRequestModal= require('../models/connectionRequest')
const router= express.Router()
const User=require("../models/user.jsx")

router
 .post('/user/:status/:toUserID',async(req,res)=>{
    try{
         const {toUserID}=req.params
        const  {fromUserID}=req.body
        const {status}=req.params
        console.log("reqParam",toUserID)

        const allowConnection=["interested","ignored"]

        const isAllowConnectionStatus= allowConnection.includes(status)
        
        if(!isAllowConnectionStatus){
          throw new Error('Please input correct payload')
        }

        const isToUser=await User.findOne({_id:toUserID})
        if(!isToUser){
         return   res.status(400).json({message:"Sender To user not exist!"})

        }



        // const isSameRequestedTosameUser= fromUserID===toUserID
        // if(isSameRequestedTosameUser){
        //            return   res.status(400).json({message:"Sender and receiver is same"})

        // }

const isAlreadyRequested= await ConnectionRequestModal.findOne({
  $or:[
    {fromUserId:fromUserID,
        toUserId:toUserID},
        {fromUserId:toUserID,
        toUserId:fromUserID,}
  ]
})


if(isAlreadyRequested){
 return res.status(208).json({message:"already send or recieve request"})
}

        console.log('req Params',fromUserID)
        
      const ConnectionRequest=new ConnectionRequestModal({
        fromUserId:fromUserID,
        toUserId:toUserID,
        status:status

      })

      const data=await ConnectionRequest.save()
      console.log("connection",data)
      res.json({message:"connection successful ",data  })


    }
    catch(error){
        res.status(400).json({message:"Something went wrong ",error:error.message})
    }
   

 })

 .post('/review/:status/:requestID',async(req,res)=>{
  try{

  const allowStatus=["accepted","rejected"]
  
  const {status,requestID}=req.params

  const {myAccount}=req.body

  const isAllowStatus=allowStatus.includes(status)
  if(!isAllowStatus){
  throw new Error("invalid Payload")
  }

  // valid rquestId
  const isValidRequest= await ConnectionRequestModal.findOne({
    _id:requestID,
    toUserId:myAccount,
    status:"interested"
  })
  if(!isValidRequest){
    throw new Error(" connection Request is not valid")
  }

  isValidRequest.status=status

const updateStatus=await isValidRequest.save();




  res.status(201).json({message:"successful",updateStatus})


  }


  catch(error){
res.status(400).json({message:"Something went wrong",error:error.message})
  }

 })




 module.exports=router


