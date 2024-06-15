
import User from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import Category from '../model/Category.model.js';
import { mailSender } from "../middleware/mailSender.js";
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
        user: user
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
export const fetchUserById = async (req, res) => {
  const id = req.userId;
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
  const id = req.userId;
  console.log("id in updated user backend is ",id);
  // console.log("req.body is ",req.body);
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



export const resetPasswordRequestHandler=async(req,res)=>{
  try{
    console.log("arrived in backend");
      const {email}=req.body;
      console.log("email is ",email);
      const user=await User.findOne({email})
      if(!user){
          return res.status(401).json({
              success:false,
              message:"you are not registered with Us"
          })   
      }
      //user exist
      const token=uuidv4();
      const updatedUser=await User.findOneAndUpdate(
        { email: email }, // Filter criteria
        { $set: { passwordChangeToken:token } }, // Update object
        { new: true } // Options (optional, but recommended)
      )
      console.log("updated user is ",updatedUser)
      console.log("token for link in reseting password is",token);
      const url=`https://qk-ord.netlify.app/reset-password?token=${token}&email=${email}`
      console.log("url is ",url);

        await mailSender(email,"pasword reset link",`password reset link:${url}`)
        return res.json({
          success:true,
          message:"Email sent successfully"
        })
  }
  catch(e){
      console.log("error in reset password catch block",e);
      return res.status(401).json({
          success:false,
          message:"problem happened somwhere in reseting password"
      })
  }


}
const resetPassword=async(req,res)=>{
  try{
      const {password,confirmPassword,token,email}=req.body;
      console.log({password,confirmPassword,token,email})
      const user=await User.findOne({email:email,passwordChangeToken:token})
      console.log("user with token and email",user);
      if(!user){
          return res.status(401).json({
              success:false,
              message:" ResetToken Expired"
          })
      }
      const hashedPassword=await bcrypt.hash(password,10);
      console.log("hashed password is ",hashedPassword)
     const updatedUser= await User.findOneAndUpdate({passwordChangeToken:token},{$set:{password:hashedPassword,passwordChangeToken:''}},{new:true})
     console.log("updated user after reseting is",updatedUser)
     return res.status(200).json({
      success:true,
      message:"password reset completely",
      user:user
  })
  }
  catch(e){
      console.log("error in reseting password",e)
      return res.status(401).json({
          success:false,
          message:"error occured in reseting password"
      })
  }

}
export {resetPassword}
