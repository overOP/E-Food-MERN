import User from "../../../model/userModel.js";

export const getUser = async (req, res) => {
  const userId = req.user.id;
    const users = await User.find({_id : {$ne : userId}}).select(["-__v", "-userPassword", "-otp", "-isOtpVerified"]);//.select("-userPassword"); to hide password
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

// delete User
export const deleteUser = async (req, res) => {
  const {id} = req.params;
  if(!id){
    return res.status(400).json({
      message: "User id is required",
    });
  }
  // check if that user exists
  const userExists = await User.findById(id);
  if(!userExists){
    return res.status(404).json({
      message: "User not found",
    });
  }
  await User.findByIdAndDelete(id);
  return res.status(200).json({
    message: "User deleted successfully",
  });
}

// edit User
export const editUser = async (req, res) => {
  const {id} = req.params;
  const {userName, userEmail, userPhoneNumber, userPassword} = req.body;
  if(!userName || !userEmail || !userPhoneNumber || !userPassword || !id){
    return res.status(400).json({
      message: "All fields are required : userName, userEmail, userPhoneNumber, userPassword, id",
    });
  }
  if(!id){
    return res.status(400).json({
      message: "User id is required",
    });
  }
  // check if that user exists
  const userExists = await User.findById(id);
  if(!userExists){
    return res.status(404).json({
      message: "User not found",
    });
  }
  // update user
  await User.findByIdAndUpdate(id, req.body);
  return res.status(200).json({
    message: "User updated successfully",
  });
}