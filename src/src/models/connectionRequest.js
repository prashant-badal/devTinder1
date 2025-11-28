
const mongoose=require('mongoose')

const {Schema}=mongoose

const connectionSchema=new Schema({
    
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"

    },

    toUserId:{
              type:mongoose.Schema.Types.ObjectId,
                required:true,
                        ref:"User"

    },
    status:{
        type:String,
        enum:['ignored',"interested" ,"accepted","rejected"],
        message:`is not targeted value`
    },

},
  { timestamps: true }
)
connectionSchema.index({fromUserId:1,toUserId:1})


connectionSchema.pre("save", function (next) {
  const connectionRequest = this;

  // Compare ObjectId properly using .equals()
  if (connectionRequest.fromUserId && connectionRequest.toUserId) {
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      return next(new Error("Sender and receiver cannot be the same"));
    }
  }

  next();
})



const Connection= mongoose.model('Connection',connectionSchema)
module.exports=Connection