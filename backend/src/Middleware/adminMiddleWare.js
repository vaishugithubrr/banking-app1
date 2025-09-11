const adminMiddleware = (req, res, next) => {
  // Check if the user is authenticated and has the 'admin' role
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    // Return a 403 Forbidden error if the user is not an admin
    res.status(403).json({ message: "Access denied: You are not an administrator." });
  }
};

export default adminMiddleware;