import Order from "../../../model/orderModel.js";

export const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate({
        path: "item.product",
        model: "Product",
        select: "-__v"
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