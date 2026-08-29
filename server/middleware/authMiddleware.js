const passport = require('passport');

// Authentication middleware using Passport JWT Strategy
const protect = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please log in to access this resource'
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Authorization middleware for Admin Role
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Admin privileges required'
    });
  }
};

module.exports = {
  protect,
  requireAdmin
};
