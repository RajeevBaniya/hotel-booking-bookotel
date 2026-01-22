import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  const { userId } = req.auth();
  if (!userId) {
    return res.json({ success: false, message: "not authenticated" });
  }
  
  const user = await User.findById(userId);
  if (!user) {
    return res.json({ 
      success: false, 
      message: "User account not synced. Please refresh and try again." 
    });
  }
  
  req.user = user;
  next();
};
