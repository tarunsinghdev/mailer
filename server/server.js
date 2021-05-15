import dotenv from 'dotenv';
import colors from 'colors';
import express from 'express';

import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(express.json()); //built in express to recognize the incoming Request Object as a JSON Object.

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

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
