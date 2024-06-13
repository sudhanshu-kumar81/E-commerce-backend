



import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';

const authenticate = async (req, res, next) => {
  console.log("arrived in try block of authenticate");

  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    console.log("authHeader in authenticate", authHeader);

    if (!authHeader) {
      console.log("authHeader is not present");
      return res.status(401).json({
        success: false,
        message: "missing token"
      });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token in authenticate", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "missing token"
      });
    }

    // Verify the token
    let payload;
    try {
      payload = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log("payload.id", payload.id);
    } catch (e) {
      console.log("Error verifying token:", e);
      return res.status(401).json({
        success: false,
        message: "token is invalid"
      });
    }

    const id = payload.id;
    console.log("id is", id);

    try {
      // Find the user by ID and token
      const rootUser = await User.findOne({ _id: id, 'tokens.token': token });

      if (!rootUser) {
        return res.status(401).json({
          success: false,
          message: "user with token not exist"
        });
      }

      req.rootUser = rootUser;
      req.userId = rootUser.id;
      req.role = rootUser.role;
      console.log("passed authentication");
      next();
    } catch (dbError) {
      console.log("Database error:", dbError);
      return res.status(500).json({
        success: false,
        message: "internal server error"
      });
    }
  } catch (err) {
    console.log("error in authorization", err);
    return res.status(500).json({
      success: false,
      message: "something went wrong while verifying token"
    });
  }
};

export { authenticate };


// import jwt  from 'jsonwebtoken'
// import User from '../model/User.model.js'
// const authenticate =async (req,res,next) => {
//     console.log("arrived in try block of authenticate ")
//     try{
//       //here how to get token
//       const authHeader = req.headers.authorization;
//       console.log("authHeader in authenticate ",authHeader)
//       if(!authHeader){
//         console.log("authHeader is not present ")
//         return res.status(401).json({
//           success: false,
//           message: "missing token"
//       })
//       }
//       console.log("authHeader in cookie is",authHeader);
//       try{
//         const token = authHeader.split(' ')[1];
//         console.log("Token in authenticate", token);
//         const payload=jwt.verify(token,process.env.TOKEN_SECRET)
//         console.log("payload.id",payload.id);
//         const id=payload.id;
//         console.log("id is ",id);
//         // const checkUser=await User.findOne({_id:id})
//         const rootUser=await User.findOne({_id:id,'tokens.token':token})
//         // console.log("rootuser is",rootUser)
//         if(!rootUser){
//           return res.status(401).json({
//             success: false,
//             message: "user with token not exist",
//         })
//         }
//         req.rootUser=rootUser;
//         req.userId=rootUser.id;
//         req.role=rootUser.role
//         console.log("passed authentication")
//         next();
//       }catch(e){
//         return res.status(401).json({
//           success: false,
//           message: "token is invalid",
//       })
//       }
//     }
//     catch(err){
//       console.log("error in authorization",err);
//       return res.status(401).json({
//         success: false,
//         message: "somethings went wrong while verifying token"
//     })
//     }
// }

// export {authenticate}
