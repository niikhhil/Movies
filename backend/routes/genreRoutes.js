import express from 'express'
const router = express.Router();

// Controllers
import { createGenre, updateGenre } from '../controllers/genreController.js';

// Middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';


router.route('/').post(authenticate, authorizeAdmin, createGenre)
router.route('/:id').put(authenticate, authorizeAdmin, updateGenre)

export default router;