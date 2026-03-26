import { Router } from 'express';
import { body } from 'express-validator';
import {
  getContacts, createContact, getContact,
  updateContact, deleteContact, restoreContact,
  getStats, getTrash
} from '../controllers/contact.controller.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
];

router.use(protect); // all contact routes are protected

router.get('/stats', getStats);
router.get('/trash', getTrash);
router.get('/', getContacts);
router.post('/', contactValidation, validate, createContact);
router.get('/:id', getContact);
router.put('/:id', contactValidation, validate, updateContact);
router.delete('/:id', deleteContact);
router.post('/:id/restore', restoreContact);

export default router;
