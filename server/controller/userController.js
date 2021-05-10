import User from '../models/user.js';

const userSubscribe = async (req, res) => {
  const { email, isAdmin } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400); //Bad request
    throw new Error('User already exists');
  }
  const user = await User.create({
    email,
    isAdmin,
  });
  if (user) {
    req.status(201).json({
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

export { userSubscribe };
