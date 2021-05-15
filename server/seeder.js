import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import User from './models/user.js';
import users from './data/users.js';

dotenv.config();
connectDB(() => {});

const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log('Data imported!'.green.inverse);
  } catch (error) {
    console.log(`${error.message}.red.inverse`);
  }
};

const destroytData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
  } catch (error) {
    console.log(`${error.message}.red.inverse`);
  }
};

if (process.argv[2] === '-d') {
  destroytData();
} else {
  importData();
}
