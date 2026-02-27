import express from 'express'
import { createUser, getAllUsers, getCurrentUserProfile, loginUser, logOutCurrentUser, updateCurrentUser } from '../controllers/userController.js';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js'

const router = express.Router();

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers );

router.post('/auth', loginUser);
router.post('/logout', logOutCurrentUser);

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUser)


export default router;