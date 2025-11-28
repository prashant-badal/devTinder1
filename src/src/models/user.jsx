const mongoose = require("mongoose"); // Use require if you are using CommonJS
const { Schema } = mongoose;

// Define the schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

      password:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
            unique: true,

    },


  
  },
  { timestamps: true }
);

// Create the model
const User = mongoose.model("User", userSchema);
module.exports = User; // export the model
