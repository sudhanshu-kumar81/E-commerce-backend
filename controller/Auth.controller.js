import User from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const createUser = async (req, res) => {
  console.log("create user backend");
  try {
    const {email,password}=req.body;
    console.log("req.body is ",req.body);
  const user = await User.findOne({ email})
  console.log("user is ",user);
  if(user){
    return res.status(401).json({
      success: false,
      message: 'user Already exist ',
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(req.body);
  newUser.password=hashedPassword;
  console.log("new user is ",newUser)
    const doc = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: doc
  })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
      error:err.message
  })
  }
};




export const loginUser = async (req, res) => {
  console.log("arrived in bakend");
  console.log("req.body", req.body);
  try {
    const { email, password } = req.body;
    console.log("email and password are",email,password);
    const user = await User.findOne(
      { email }
    ).exec();
    console.log("user is",user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'no such user email Found',
      });
    }
    const match = await bcrypt.compare(password, user.password);
    console.log("match is ",match);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "incorrect password"
      })
    }
    if (match) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '30m' })
      console.log("token is ", token)
      user.tokens = user.tokens.concat({ token });
      await user.save();
      res.status(200).json({
        success: true,
        message: "you are logined",
        token: token,
        user: { id: user.id, role: user.role }
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: "internal error",
      success: false,
      error: err.message,
    });
  }
};


