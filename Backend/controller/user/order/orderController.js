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

// update My ovder
export const updateMyOrder = async (req, res) => {
    const userId = req.user.id;
    const {id} = req.params;
    const {item, shippingAddress} = req.body;
    if(item.length == 0 || !shippingAddress){
        return res.status(400).json({ 
            message: "All fields are required: item, shippingAddress"
         });
    }

    // get order of above id
    const existingOrder = await Order.findById(id);
    if(!existingOrder){
        return res.status(404).json({ 
            message: "Order not found"
         });
    }

    // check if the trying to update user is the owner of the order
    if(existingOrder.user !== userId){
        return res.status(403).json({ 
            message: "You are not authorized to update this order"
         });
    }

    if(existingOrder.orderStatus == "ontheway") {
        return res.status(400).json({ 
            message: "You cannot update the order status after it is on the way"
         });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, {item,shippingAddress});
    return res.status(200).json({ 
        message: "Order updated successfully",
        data: updatedOrder
     });
}

// delete My order
export const deleteMyOrder = async (req, res) => {
    const userId = req.user.id;
    const {id} = req.params;

    //check if order exists
    const existingOrder = await Order.findById(id);
    if(!existingOrder){
        return res.status(404).json({ 
            message: "Order not found"
         });
    }
    
    // check if the trying to delete user is the owner of the order
    if(existingOrder.user !== userId){
        return res.status(403).json({ 
            message: "You are not authorized to delete this order"
         });
    }

    await Order.findByIdAndDelete(id);
    return res.status(200).json({ 
        message: "Order deleted successfully",
        data : null
     });
}

// cancel My order
export const cancelMyOrder = async (req, res) => {
    const userId = req.user.id;
    const {id} = req.params;
    // check if order exists
    const existingOrder = await Order.findById(id);
    if(!existingOrder){
        return res.status(404).json({ 
            message: "Order not found"
         });
    }
    // check if the trying to change user is the owner of the order
    if(existingOrder.user !== userId){
        return res.status(403).json({ 
            message: "You are not authorized to change this order status"
         });
    }
    if(existingOrder.orderStatus !== "pending"){
        return res.status(400).json({ 
            message: "You can only cancel pending orders"
         });
    }
   const updatedOrder = await Order.findByIdAndUpdate(id, {
    orderStatus: "cancelled"
}, {new: true});
    return res.status(200).json({ 
        message: "Order status changed to cancelled successfully",
        data: updatedOrder
     });
}