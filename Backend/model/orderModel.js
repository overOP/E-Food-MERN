import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    item : [{
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product is required"],
        }
    }],
    totalAmount: {
        type: Number,
        required: [true, "Total Amount is required"],
    },
    shippingAddress: {
        type: String,
        required: [true, "Shipping Address is required"],
    },
    orderStatus: {
        type: String,
        enum: ["pending", "delivered", "cancelled", "ontheway", "preparation"],
        default: "pending",
    },
    paymentDetails: {
        pidx: {
            type: String,
        },
        method: {
            type: String,
            enum: ["cod", "khalti"],
        },
        status: {
            type: String,
            enum: ["paid", "unpaid", "panding"],
            default: "panding",
        }
    }
},{
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);
export default Order;