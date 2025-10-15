import mongoose from "mongoose";
const Schema = mongoose.Schema;

const nextReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  rating: {
    type: Number,
    default: 3,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
}, {
  timestamps: true
});

const NextReview = mongoose.model("NextReview", nextReviewSchema);
export { NextReview, nextReviewSchema };
export default NextReview;
