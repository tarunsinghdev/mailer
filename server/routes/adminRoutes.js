import express from 'express';
import { adminSendMail, authUser } from '../controller/userController.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/sendmail', adminSendMail);

export default router;
