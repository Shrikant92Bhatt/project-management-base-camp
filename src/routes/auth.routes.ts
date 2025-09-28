import { Router } from 'express';
import { registerController } from '../controller';
import { validate } from '../middleware';
import { userRegisterValidator } from '../validators';

const router = Router();
console.log('Auth router loaded');
router.post('/register', validate, userRegisterValidator(), registerController);

export default router;
