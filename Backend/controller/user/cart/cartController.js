import Product from "../../../model/productModel.js";
import User from "../../../model/userModel.js";

export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const {peoductId } = req.params;

    if(!peoductId){
        return res.status(400).json({ 
            message: "Product ID is required"
         });
    }
    const productExists = await Product.findById(peoductId);
    if(!productExists){
        return res.status(404).json({ 
            message: "Product not found"
         });
    }
    const user = await User.findById(userId);
    user.cart.push(peoductId);
    await user.save();
    return res.status(200).json({ 
        message: "Product added to cart successfully",
        data: user.cart
     });
}

// get All cart items of user
export const getAllCartItems = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
        path: "cart",
        model: "Product",
        select: "-__v -createdAt -updatedAt -productStatus"
    })
    return res.status(200).json({ 
        message: "Cart items fetched successfully",
        data: user.cart
     });
}

// delete cart item 
export const deleteCartItem = async (req, res) => {
    const userId = req.user.id;
    // const {peoductIds } = req.body;
    const { peoductId } = req.params;
    // check if that product exists 
    const productExists = await Product.findById(peoductId);
    if(!productExists){
        return res.status(404).json({ 
            message: "Product not found"
         });
    }
    // get user cart
    const user = await User.findById(userId);
    // check if product is in cart

    // multiple products deletion
    // peoductIds.forEach(peoductID => {
    //     user.cart = user.cart.filter(pId => pId != peoductID); // remove product from cart
    // });
    user.cart = user.cart.filter(pId => pId != peoductId); // remove product from cart
    await user.save();
    return res.status(200).json({ 
        message: "Product removed from cart successfully",
        data: user.cart
     });
}