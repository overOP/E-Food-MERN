import e from "express";
import User from "../../../model/userModel.js";

export const getUser = async (req, res) => {
  const userId = req.user.id;
    const users = await User.find({_id : {$ne : userId}}).select(["-__v"]);//.select("-userPassword"); to hide password
                                          // $ne is not equal
    // check if users exist
    if (!users) {
      return res.status(404).json({
        message: "Users not found",
        data : [], // empty array if users not found
      });
    }
    return res.status(200).json({
      message: "Users fetched successfully",
      data : users,
    });
}