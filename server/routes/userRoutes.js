import express from 'express';
import { userSubscribe } from '../controller/userController.js';

const router = express.Router();

router.post('/subscribe', userSubscribe);

export default router;
