
const express=require('express')
const userRouter=express.Router()
const connectionModal=require('../models/connectionRequest')
const User=require('../models/user.jsx')



userRouter.post('/requests/received',async(req,res)=>{

    try{
        const {myAccount}=req.body

const receivedRequestList=await connectionModal.find({
    toUserId:myAccount,

}).populate('fromUserId',["name","_id","email"])

if(receivedRequestList.length==0){
    throw new Error(" No coorect id or status")
}

res.status(201).json({message:"Successfully Fetch data",receivedRequestList})

    }
    catch(error){
res.status(401).json({message:"No Fetch data",error:error.message})

    }




})

.post('/connection',async(req,res)=>{

    try{
        const {myAccount}=req.body

const receivedRequestList=await connectionModal.find({ 
    status:"accepted",
    $or:[{toUserId:myAccount},{fromUserId:myAccount}]
    

})
.populate('fromUserId',["name","_id","email"])
.populate('toUserId',["name","_id","email"])


if(receivedRequestList.length==0){
    throw new Error(" No coorect id or status")
}
const data=receivedRequestList.map((row)=>{
    if(row.toUserId._id.toString()==myAccount.toString()){
        return row.fromUserId
    }
    return row.toUserId
    
})

res.status(201).json({message:"Successfully  Friends data",data})

    }
    catch(error){
res.status(401).json({message:"No Fetch data",error:error.message})

    }




})

.post('/feed',async(req,res)=>{
    try{
                const {myAccount}=req.body

        const feedData=await User.find()
        if(feedData.length==0){
            throw new Error("No User is Found")
        }
        const data= feedData.filter((d)=>{
            return d._id !=myAccount
        })
         if(feedData.length==0){
            throw new Error("No feed Available")
        }
        res.status(200).json({mesage:"Success Fetch Data",data})
    }
    catch(error){
        res.status(400).json({mesage:"Something went wrong",error:error.message})

    }
})

module.exports=userRouter