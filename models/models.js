import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    categoryA : {
        type : String,
        required : [true,"please select category1"]
    },
    categoryB : {
        type : String,
        required : [true,"please select category2"]
    },
    amount : {
        type : String,
        required : [true,"Enter a amount"]
    },
    desc:{
       type : String,
    },
    transactionDate : Date
})
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : [true,"please provide usernam"]
     },
     email : {
        type : String,
        unique : true,
        required : [true,"please provide usernam"]
     },
     password : {
        type : String,
        required : [true,"please provide password"]
     },
     transaction :[transactionSchema],
     isVerified:{
        type : Boolean,
        default : false
     },
     verifyToken : String,
     verifyTokenExpiry : Date,
     resetPasswordToken : String,
     resetPasswordTokenExpiry : Date

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User