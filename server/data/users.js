import bcrypt from 'bcryptjs';

const users = [
  {
    email: 'tarun@mailer.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    email: 'tarunsingh5169202@gmail.com',
  },
  {
    email: 'david@gmail.com',
  },
  {
    email: 'steven@gmail.com',
  },
  {
    email: 'mike@gmail.com',
  },
  {
    email: 'john@gmail.com',
  },
];

export default users;
