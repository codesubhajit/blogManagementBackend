import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      
      req.user = decoded; 
      next();
    });

  } catch (error) {
    console.error("JWT Middleware Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
