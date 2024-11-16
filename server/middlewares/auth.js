const jwt = require('jsonwebtoken');

module.exports.authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request object
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
};