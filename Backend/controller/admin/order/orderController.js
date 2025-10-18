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

// get sinfgle order
export const getSingleOrder = async (req, res) => {
    const {id} = req.params;
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({ 
            message: "Order not found"
         });
    }
    return res.status(200).json({ 
        message: "Order fetched successfully",
        data: order
     });
}

// update order status
export const updateOrderStatus = async (req, res) => {
    const {id} = req.params;
    const {orderStatus} = req.body;
    if(!orderStatus || !["pending", "shipped", "delivered", "cancelled"]
        .includes(orderStatus.toLowerCase())){
        return res.status(400).json({ 
            message: "Valid orderStatus is required: pending, shipped, delivered, cancelled"
         });
    }
    // get order of above id
    const existingOrder = await Order.findById(id);
    if(!existingOrder){
        return res.status(404).json({ 
            message: "Order not found"
         });
    }
   const updatedOrder = await Order.findByIdAndUpdate(id, {
       orderStatus
    });
    return res.status(200).json({ 
        message: "Order status updated successfully",
        data: updatedOrder
     });
}

// delete order
export const deleteOrder = async (req, res) => {
    const {id} = req.params;
    // get order of above id
    const existingOrder = await Order.findById(id);
    if(!existingOrder){
        return res.status(404).json({ 
            message: "Order not found"
         });
    }
    await Order.findByIdAndDelete(id);
    return res.status(200).json({ 
        message: "Order deleted successfully",
        data : null
     });
}