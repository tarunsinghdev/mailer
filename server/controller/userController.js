import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

import User from '../models/user.js';
import sgMail from '@sendgrid/mail';
import generateAuthToken from '../util/generateToken.js';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Method : POST
//route : /api/user/subscribe

const userSubscribe = asyncHandler(async (req, res) => {
  const { email, isAdmin } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' }); //Bad request
    throw new Error('User already exists');
  }
  const user = await User.create({
    email,
    isAdmin,
  });
  if (user) {
    res.status(201).json({
      email: user.email,
      isAdmin: user.isAdmin,
    });
    const msg = {
      to: user.email,
      from: 'tarunsingh5169202@outlook.com',
      subject: 'Sign up successful',
      text: 'May it succeed!',
      html: `<h1>Thank you for signing up.</h1><p>Now enjoy short and concise tech news everyday.`,

      // templateId: 'd-f91b59fd52924f5293a88875ea6f1828',
    };

    sgMail
      .send(msg)
      .then(() => console.log('mail sent!'))
      .catch((err) => console.log(err));
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//Method : POST
//route : /api/admin/login

const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  const adminUser = await User.findOne({ email });
  try {
    if (!adminUser || !adminUser.isAdmin) {
      throw new Error('Unable to login');
    }
    if (await adminUser.matchPassword(password)) {
      res.json({
        _id: adminUser._id,
        email: adminUser.email,
        token: await generateAuthToken(adminUser),
        subscribedUsers: await User.find({}).select('email'),
      });
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

//Method : POST
//route : /api/admin/sendmail

const adminSendMail = asyncHandler(async (req, res) => {
  const { subject, body } = req.body;

  const allUsers = await User.find({});
  const mails = allUsers.map((user) => user.email);

  if (subject.trim() && body.trim()) {
    const msg = {
      to: mails,
      from: 'tarunsingh5169202@outlook.com',
      subject: subject,
      text: 'Tech news for tech savvy people!',
      html: `<h1>Here's your news</h1><p>${body}</p`,

      // templateId: 'd-f91b59fd52924f5293a88875ea6f1828',
    };
    sgMail
      .sendMultiple(msg)
      .then(() => console.log('Bulk mail sent!'.green))
      .catch((err) => console.log(err));
    res.status(200).send({ message: 'mail sent' });
  } else {
    throw new Error('Please enter valid details');
  }
});

export { userSubscribe, authUser, adminSendMail };
