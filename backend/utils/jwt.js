const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15d" });
};

module.exports = { generateToken };
