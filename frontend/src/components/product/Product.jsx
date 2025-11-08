import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";

const Product = ({ id: productId }) => {
  const dispatch = useDispatch();

const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const { selectedProduct } = useSelector((state) => state.product);
  const product = selectedProduct?.product;
  const reviews = selectedProduct?.productReviews || [];

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  const handleCart = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    dispatch(addToCart(productId));
  }
  

  return (
    <div className="container mx-auto px-6 pt-20 pb-24 md:pt-28 lg:pt-24 lg:pb-32">
      <section className="overflow-hidden text-gray-700 bg-white body-font rounded-2xl shadow-lg">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            {/* Product Image */}
            <img
              alt={product.productName}
              className="object-cover object-center w-full border border-gray-200 rounded-lg lg:w-1/2"
              src={product.productImage}
            />

            {/* Product Details */}
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <h1 className="mb-2 text-3xl font-bold text-gray-900 title-font">
                {product.productName}
              </h1>

              <p className="mb-4 text-gray-600">{product.productDescription}</p>

              <div className="space-y-2 mb-6">
                <p className="text-gray-800">
                  <strong>Status:</strong> {product.productStatus}
                </p>
                <p className="text-gray-800">
                  <strong>Stock Left:</strong> {product.productStockQty}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-2xl font-semibold text-gray-900">
                  NPR {product.productPrice}
                </span>

                <button className="flex px-6 py-2 ml-auto text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600" onClick={handleCart} >Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mt-10 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Customer Reviews</h2>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {review.userId.userName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Rating: {review.rating}/10
                  </span>
                </div>
                <p className="text-gray-700 italic">"{review.message}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </section>
    </div>
  );
};

export default Product;
