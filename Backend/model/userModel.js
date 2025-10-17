import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : {
        type : String,
        required : [true, "userName is required"],
    },
    userEmail : {
        type : String,
        lowercase : true,
        required : [true, "userEmail is required"],//"Email is required" is a error message 
        unique : true 
    },
    userPhoneNumber : {
        type : Number,
        required : [true, "userPhoneNumber is required"],
    },
    userPassword : {
        type : String,
        required : [true, "userPassword is required"],
    },
    role : {
        type : String,
        enum : ["customer", "admin"], //customer or admin
        default : "customer",          //default role is customer
    },
    otp : {
        type : Number,
        default : undefined,
    },
    isOtpVerified : {
        type : Boolean,
        default : false,
    },
    cart : [{
        type : Schema.Types.ObjectId,
        ref : "Product",
    }],
},{
    timestamps : true
})

const User = mongoose.model("User", userSchema);
export default User;