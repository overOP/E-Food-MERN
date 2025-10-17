import Order from "../../../model/orderModel.js";


export const createOrder = async (req, res) => {
    const userId = req.user.id;
    const {item, totalAmount, shippingAddress, paymentDetails} = req.body;
    if(!item.length > 0 || !totalAmount || !shippingAddress || !paymentDetails){
        return res.status(400).json({ 
            message: "All fields are required: item, totalAmount, shippingAddress, paymentDetails"
         });
    }
    await Order.create({
        user: userId,
        item,
        totalAmount,
        shippingAddress,
        paymentDetails
    });
    return res.status(201).json({ 
        message: "Order created successfully"
     });
}

// get My orders of user
export const getMyOrders = async (req, res) => {
    const userId = req.user.id;
    const orders = await Order.find({user: userId}).populate({
        path: "item.product",
        model: "Product",
        select: "-__v -productStockQty -createdAt -updatedAt"
    });
    if(orders.length == 0){
        return res.status(404).json({ 
            message: "No orders found",
            data: []
         });
    }

    return res.status(200).json({ 
        message: "Orders fetched successfully",
        data: orders
     });
}