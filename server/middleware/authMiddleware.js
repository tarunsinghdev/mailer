import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  try {
    const adminUser = await User.find({ isAdmin: true });
    if (adminUser[0].tokens.length === 0) {
      //check for multiple sessions
      throw new Error('Unauthorized access, Please login again');
    }

    const token = req.header('Authorization').split(' ')[1]; //if no forward to catch

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('Unauthorized access');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
    next(error);
  }
};

export { protect };
