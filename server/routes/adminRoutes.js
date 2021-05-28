import express from 'express';
import {
  adminLogout,
  adminLogoutAll,
  adminSendMail,
  authUser,
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/sendmail', protect, adminSendMail);
router.post('/logout', protect, adminLogout);
router.post('/logoutall', protect, adminLogoutAll);

export default router;
