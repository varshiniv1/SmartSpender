import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode the user ID from it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user object to the request (excluding the password field)
      req.user = await User.findById(decoded.userId).select("-password");

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Log the error and return unauthorized status
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    // If no token is found in the Authorization header, send unauthorized error
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
