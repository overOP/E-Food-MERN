import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("fastfood");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search", { category, query });
  };

  return (
    <section className="relative w-full h-screen bg-yellow-50">
      <div className="container mx-auto px-6 pt-24 h-full flex items-center">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-900 leading-tight max-w-2xl">
              Your favorite dishes, delivered right to your door
            </h1>

            <p className="mt-6 max-w-xl text-gray-700">
              Discover local restaurants, contactless delivery, and secure payments.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 w-full max-w-2xl">
              <div className="flex items-center gap-3 p-1 rounded-full bg-white border border-yellow-200 shadow-sm focus-within:ring-2 focus-within:ring-yellow-200">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="hidden md:block rounded-full px-4 py-3 bg-transparent text-sm text-gray-700 outline-none"
                >
                  <option value="fastfood">Fast Food</option>
                  <option value="restaurant">Restaurant</option>
                </select>

                <input
                  id="query"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dishes, restaurants, or cuisine"
                  className="flex-1 px-4 py-3 rounded-full text-sm bg-transparent outline-none"
                />

                <button
                  type="submit"
                  className="items-center rounded-full px-5 py-2.5 text-sm font-semibold bg-linear-to-r from-yellow-300 to-yellow-400 text-yellow-900 shadow-md"
                >
                  <CiSearch />
                </button>
              </div>
            </form>
          </motion.div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-[320px] sm:w-[420px] md:w-[520px] lg:w-[560px] xl:w-[640px] transform-gpu"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px]">
                  <Spline scene="https://prod.spline.design/E99u-GtuaMmzjXko/scene.splinecode" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
