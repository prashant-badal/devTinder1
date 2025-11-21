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

    // gender: {
    //   type: String,
    //   validate: {
    //     validator: function (v) {
    //       return ["MALE", "FEMALE"].includes(v);
    //     },
    //     message: (props) => `${props.value} is not a valid gender!`,
    //   },
    // },

    // skills: {
    //   type: [String],
    // },
    // phone: {
    //   type: Number,
    //   required: false,
    //   min: [6, "Must be at least 6, got {VALUE}"],
    //   default: 542525,
    // },
  
  },
  { timestamps: true }
);

// Create the model
const User = mongoose.model("User", userSchema);
module.exports = User; // export the model
