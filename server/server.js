import dotenv from 'dotenv';
import colors from 'colors';
import express from 'express';

import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/user/subscribe', userRoutes);

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
