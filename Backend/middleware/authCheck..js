import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../model/userModel.js";

const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Please login",
      });
    }

    // verify if the token is valid
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if decoded.id(user id) exists in database
    const doesUserExist = await User.findById(decoded.id);
    if (!doesUserExist) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    req.user = doesUserExist;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default authCheck;
