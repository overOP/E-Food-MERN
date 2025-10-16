import Product from "../../../model/productModel.js";
import Review from "../../../model/reviewModel.js";

// create review
export const creatReview = async (req, res) => {
    const userId = req.user.id
    const {rating, message} = req.body;
    const productId = req.params.id;
    if(!rating || !message || !productId){
        return res.status(400).json({
            message: "All fields are required : rating, message, productId",
        });
    }
    //check if that productId product exists or not
    const productExists = await Product.findById(productId);
    if(!productExists){
        return res.status(404).json({
            message: "Product not found",
        });
    }
    //insert them into Review 
    await Review.create({
        userId,
        productId,
        rating,
        message
    })
    return res.status(200).json({
        message: "Review added successfully",
    });
}

// getMy reviews
export const getMyReviews  = async (req, res) => {
    const userId = req.user.id;
    const reviews = await Review.find(({userId}))
    if(!reviews){
        return res.status(404).json({
            message: "Reviews not found",
            data : [], // empty array if reviews not found
        });
    }
    return res.status(200).json({
        message: "Reviews fetched successfully",
        data: reviews,
    });
}

// delete review
export const deleteReview = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            message: "Review id is required",
        });
    }
    // check if that user created this review
    const userId = req.user.id;
    const review = Review.findById(id);
    const ownerIdOfReview = review.userId;
    if(userId !== ownerIdOfReview){
        return res.status(401).json({
            message: "You are not authorized to delete this review",
        });
    }
    await Review.findByIdAndDelete(id);
    return res.status(200).json({
        message: "Review deleted successfully",
    });
}

//edit review
export const editReview = async (req, res) => {
    const {id} = req.params;
    const {rating, message} = req.body;
    if(!rating || !message || !id){
        return res.status(400).json({
            message: "All fields are required : rating, message, id",
        });
    }
    await Review.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
        message: "Review updated successfully",
    });
}