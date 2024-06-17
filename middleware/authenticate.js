



import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';

const authenticate = async (req, res, next) => {

  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "missing token"
      });
    }

    const token = authHeader.split(' ')[1];

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
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid"
      });
    }

    const id = payload.id;

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
      next();
    } catch (dbError) {
      return res.status(500).json({
        success: false,
        message: "internal server error"
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong while verifying token"
    });
  }
};

export { authenticate };

