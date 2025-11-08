import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // it is used to dispatch actions to the Redux store

const { data: products, status} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  if(status === 'loading'){
    return <h1>Loading...</h1>
  }

  if(status === 'error'){
    return <h1>Error ! Something went wrong</h1>
  }

  const handleDetails = (_id) => {
    navigate(`/details/${_id}`);
  }

  return (
    <>
      <Hero />
      <section className="container mx-auto px-6 pt-20 pb-24 md:pt-28 lg:pt-24 lg:pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-14 text-gray-900 dark:text-white tracking-tight">
          Our Popular Foods
        </h1>

        <div
        
         className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product._id}
              onClick={() => handleDetails(product._id,)}
              className="group cursor-pointer transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="aspect-4/3 w-full overflow-hidden rounded-t-2xl">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  src={product.productImage}
                  alt={product.productName}
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 duration-300">
                    {product.productName}
                  </h2>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {product.productDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      Rs. {product.productPrice}
                    </p>
                    <p className="text-sm text-gray-400 line-through">$25.00</p>
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
