import jwt from 'jsonwebtoken';

const generateAuthToken = async (adminUser) => {
  const token = jwt.sign(
    { id: adminUser._id.toString() },
    process.env.JWT_SECRET
  );
  adminUser.tokens = adminUser.tokens.concat({ token });
  await adminUser.save();

  return token;
};

export default generateAuthToken;
