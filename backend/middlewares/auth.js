const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = authMiddleware;
