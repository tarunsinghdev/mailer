import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

import User from '../models/user.js';
import sgMail from '@sendgrid/mail';
import generateAuthToken from '../util/generateToken.js';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Method : POST
//route : /api/user/subscribe

const userSubscribe = async (req, res) => {
  const { email, isAdmin } = req.body;

  try {
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
        from: 'mailer.newsletter.app@gmail.com',
        subject: 'Sign up successful',
        text: 'May it succeed!',
        html: `<h1 style="font-size: 40px">Thanks for signing up.<br/> We think <span style="color:#e85042">you'll love it here.</span></h1><p style="font-size: 22px">Now enjoy short and concise tech news everyday. <br /> Mailer is a daily newsletter app with links and the TLDRs <br/> of the most interesting stories in tech! &nbsp;<br/><br/> Tarun Singh<br/>Founder, <a style="color:#e85042" href="https://mail-dose.herokuapp.com/">Mailer</a>`,

        // templateId: 'd-f91b59fd52924f5293a88875ea6f1828',
      };

      sgMail
        .send(msg)
        .then(() => console.log('mail sent!'))
        .catch((err) => console.log(err));
    } else {
      throw new Error('Internal server error');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

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
        subscribedUsers: (await User.find({}).select('email')).slice(1),
      });
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

//Method: POST
//router : /api/admin/logout

const adminLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    next(error);
  }
};

//Method: POST
//router : /api/admin/logoutall

const adminLogoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({ message: 'Logged out accross devices' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
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
      to: mails.slice(1),
      from: 'mailer.newsletter.app@gmail.com',
      subject: subject,
      text: 'Tech news for tech savvy people!',
      html: `<h1 style="color:#e85042">Top news of the day.</h1><p style="font-size:20px">${body}</p`,

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

export { userSubscribe, authUser, adminLogout, adminLogoutAll, adminSendMail };
