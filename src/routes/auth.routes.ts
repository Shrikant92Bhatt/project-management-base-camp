import { Router } from 'express';
import { registerController, login } from '../controller';
import { validate } from '../middleware';
import { userLoginValidator, userRegisterValidator } from '../validators';

const router = Router();
console.log('Auth router loaded');
router.post('/register', userRegisterValidator(), validate, registerController);
router.post('/login', userLoginValidator(), validate, login);

export default router;
