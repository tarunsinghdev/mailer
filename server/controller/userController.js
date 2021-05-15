import asyncHandler from 'express-async-handler';
// import nodemailer from 'nodemailer';
// import sendgridTransport from 'nodemailer-sendgrid-transport';

import User from '../models/user.js';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

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
      subject: 'Sending via SendGrid',
      text: 'May it succeed!',
      html: `<h1>You successfully signed up!</h1>`,

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

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const adminUser = await User.findOne({ email });

  if (!adminUser.isAdmin) {
    res.status(400).send({ message: 'Not authorized as admin' });
    throw new Error('Not authorized as admin');
  }
  if (adminUser && (await adminUser.matchPassword(password))) {
    res.json({
      _id: adminUser._id,
      email: adminUser.email,
    });
  } else {
    res.status(404).send({ message: 'Invalid email or password' });
    throw new Error('Invalid email or password');
  }
};

const adminSendMail = asyncHandler(async (req, res) => {
  const { subject, body } = req.body;

  const allUsers = await User.find({});
  const mails = allUsers.map((user) => user.email);

  if (subject.trim() && body.trim()) {
    const msg = {
      to: mails,
      from: 'tarunsingh5169202@outlook.com',
      subject: subject,
      text: 'Receive a joke everyday!',
      html: `<h1>Joke of the Day</h1><p>${body}</p`,

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
