import User from "../../../model/userModel.js";
import bcrypt from "bcrypt";

//get my profile data
export const getMyProfile = async (req, res) => {
  const userId = req.user.id;
  const myProfile = await User.findById(userId);
  // send response
  return res.status(200).json({
    message: "My profile fetched successfully",
    data: myProfile,
  });
};

//  update my profile data
export const updateMyProfile = async (req, res) => {
  const { userName, userEmail, userPhoneNumber } = req.body;
  const userId = req.user.id;
  const updatedProfile = await User.findByIdAndUpdate(userId, {
    userName,
    userEmail,
    userPhoneNumber,
  },{
    runValidators : true ,// to validate the data
    new : true
  });
  return res.status(200).json({
    message: "My profile updated successfully",
    data: updatedProfile,
  });
};

// updata my password
export const updateMyPassword = async (req, res) => { 
  const {oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;
  if(!oldPassword || !newPassword || !confirmPassword){
    return res.status(400).json({
      message: "All fields are required: oldPassword, newPassword, confirmPassword",
    });
  }
  if(newPassword !== confirmPassword){
    return res.status(400).json({
      message: "newPassword and confirmPassword are not same",
    });
  }
  const userData = await User.findById(userId);
  const hashedOldPassword = userData.userPassword;
  // check if old password is correct
  const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, hashedOldPassword);
  if(!isOldPasswordCorrect){
    return res.status(400).json({
      message: "Old password is incorrect",
    });
  }
  // update password
  userData.userPassword = bcrypt.hashSync(newPassword, 10);
  await userData.save();
  return res.status(200).json({
    message: "My password updated successfully",
  });
}

// delete my profile data
export const deleteMyProfile = async (req, res) => {
  const userId = req.user.id;
  await User.findByIdAndDelete(userId);
  return res.status(200).json({
    message: "My profile deleted successfully",
    data: null,
  });
};