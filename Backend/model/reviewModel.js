import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId, //to get the id of the user
        ref : "User",//to get the user model
        required : [true, "User id is required"],
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : [true, "Product id is required"],
    },
    rating : {
        type : Number,
        default : 3,
    },
    message : {
        type : String,
        required : true,
    }
},{
    timestamps : true
})

const Review = mongoose.model("Review", reviewSchema);
export default Review