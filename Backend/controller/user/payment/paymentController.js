import axios from "axios";
import Order from "../../../model/orderModel.js";

export const initiateKhaltiPayment = async (req, res) => {
  const { orderId, amount } = req.body;
  if (!orderId || !amount) {
    return res.status(400).json({ 
        message: "Order ID and amount are required" 
    });
  }
  const paymentData = {
    return_url: "http://localhost:3000/api/payment/success",
    website_url: process.env.BASE_URL,
    amount: amount * 100,
    purchase_order_id: orderId,
    purchase_order_name: "orderName_" + orderId  //`Payment for order ${orderId}`
  }
  const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", paymentData,{
    headers: {
        "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
    }
  })
  const order = await Order.findById(orderId);
    order.paymentDetails.pidx = response.data.pidx;
    await order.save();
//   return res.redirect(response.data.payment_url); // Redirecting user to Khalti payment page
  return res.status(200).json({
    message: "Payment initiated successfully",
    data: response.data,
  });
};

export const verifyKhaltiPayment = async (req, res) => {
    const pidx = req.query.pidx;
    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/", {
        pidx: pidx
    },{
        headers: {
            "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
        }
    })
    if(response.data.status == "Completed") {
        //database modification
        const order = await Order.find({ "paymentDetails.pidx": pidx });
        order[0].paymentDetails.method = "khalti";
        order[0].paymentDetails.status = "paid";
        await order[0].save();
        // notify to frontend
        res.redirect("http://localhost:3000")
    }else{
        // notify error to frontend
        res.redirect("http://localhost:3000/errorPage") 
    }

    // return res.send(response.data);
    // return res.status(200).json({ 
    //     message: "Payment verified successfully",
    //     data: response.data
    //  });
}