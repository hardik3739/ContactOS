import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validate, register
);
router.post('/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validate, login
);
router.get('/me', protect, getMe);

export default router;
