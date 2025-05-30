module.exports = (...allowedRoles) => {
    return (req, res, next) => {
      const user = req.user; // Assumes decoded JWT is stored in req.user
  
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
  
      next();
    };
  };
  