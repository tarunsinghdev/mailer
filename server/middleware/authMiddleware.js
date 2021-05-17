import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  try {
    const token = req.headers('Authorization').split(' ')[1]; //if no token goes to catch
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Unauthorized access');
  }
};

export { protect };
