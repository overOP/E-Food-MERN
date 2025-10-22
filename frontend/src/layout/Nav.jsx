import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart);
  console.log(items);
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white">

      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
            <h1 
            onClick={() => navigate("/")}
            className="flex space-x-2 items-center">
              <span className="text-2xl font-bold text-yellow-900">
                Nepal <span className="text-yellow-700">Feedus</span>
              </span>
            </h1>

            <button
              aria-label="humburger"
              id="hamburger"
              className="relative w-10 h-10 -mr-2 lg:hidden"
            >
              <div
                aria-hidden="true"
                id="line"
                className="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transtion duration-300"
              ></div>
              <div
                aria-hidden="true"
                id="line2"
                className="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transtion duration-300"
              ></div>
            </button>
          </div>

          <div className="hidden w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12">
            <div className="text-gray-600 lg:pr-4">
              <ul className="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                {items.length !== 0 && (
                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/cart")}
                      className="block transition md:px-4 hover:text-yellow-700"
                    >
                      <span>
                        Cart <sup>{items.length}</sup>{" "}
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l">
              <button
                type="button"
                  onClick={() => navigate("/register")}
                title="Start buying"
                className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max"
              >
                <span className="block text-yellow-800 font-semibold text-sm">
                  Register
                </span>
              </button>
              <button
                type="button"
                  onClick={() => navigate("/login")}
                title="Start buying"
                className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
              >
                <span className="block text-yellow-900 font-semibold text-sm">
                  Login
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
