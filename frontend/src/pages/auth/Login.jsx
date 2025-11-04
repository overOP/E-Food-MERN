import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATUSES } from "../../global/misc/statuses";
import { loginUser } from "../../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    Email: "",
    Password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg-yellow-50">
      <div className="mt-20 bg-white w-17/12 lg:w-5/12 md:6/12 shadow-3xl ">
        <form className="p-3 md:p-10" onSubmit={handleSubmit}>
          <div className="flex items-center mb-6 text-lg md:mb-8">
            <input
              type="email"
              name="Email"
              onChange={handleChange}
              value={userData.Email}
              className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center mb-6 text-lg md:mb-8">
            <input
              type="password"
              name="Password"
              onChange={handleChange}
              value={userData.Password}
              className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            className="w-full p-2 font-medium text-white uppercase bg-linear-to-b from-gray-700 to-gray-900 md:p-4"
            disabled={status === STATUSES.LOADING}
          >
            {status === STATUSES.LOADING ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
