import dotenv from 'dotenv';
import colors from 'colors';
import express from 'express';
import path from 'path';

import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(express.json()); //built in express to recognize the incoming Request Object as a JSON Object.

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

const __dirname = path.resolve(); //as here we're using es module syntax

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Api is running...');
  });
}

const PORT = process.env.PORT || 5000;

connectDB(() => {
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  );
});
