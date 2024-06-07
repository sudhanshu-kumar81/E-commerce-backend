import User from "../model/User.model.js";

export const createUser = async (req, res) => {
  console.log("create user backend");
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json({
        success:true,
        message:'user created successfully',
        user:doc
    });
  } catch (err) {
    res.status(400).json({
        success:false,
        message:'failed to user creation',
        error:err.message
    });
  }
};

export const loginUser = async (req, res) => {
  console.log("arrived in bakend");
  console.log("req.body",req.body.email);
  try {
    const user = await User.findOne(
      { email: req.body.email },
    ).exec();
    // TODO: this is just temporary, we will use strong password auth
    console.log({user})
    if (!user) {
      console.log("hi");
     return res.status(401).json({ 
        success:false,
        message: 'no such user email' });
    } else if (user.password === req.body.password) {
        console.log("user verified user".user);
      res.status(200).json({
        success:true,
        message:"user verified",
        user:user});
    } else {
      res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({
        message:"internal error",
        success:false,
        error:err.message,
    });
  }
};