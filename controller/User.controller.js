import Category from '../model/Category.model.js';
import User from '../model/User.model.js';

export const fetchUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const user = await User.findById(id);
    res.status(200).json({
        success:true,
        message:"user fetched by Id",
        user:user
    });
  } catch (err) {
    res.status(400).json({
        success:false,
        message:"failed to fatch user by id",
        error:err.message
    });
  }
};

export const updateUser = async (req, res) => {

  const { id } = req.params;
  console.log("id in updated user backend is ",id);
  console.log("req.body is ",req.body);
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    console.log("after update user is",user)
    res.status(200).json({
        success:true,
        message:"user Updated successfully",
        updatedUser:user
    });
  } catch (err) {
    res.status(400).json({
        success:false,
        message:"failed to update user by id",
        error:err.message
    });
  }
};
//   const { id } = req.params;
//   console.log("req.params is ",req.params);
//   console.log("id is ",id);
//   try {
//     const user = await User.findById(id);
//     res.status(200).json({
//         success:true,
//         message:"user fetched by Id",
//         user:user.orders
//     });
//   } catch (err) {
//     res.status(400).json({
//         success:false,
//         message:"failed to fatch user by id",
//         error:err.message
//     });
//   }
// };