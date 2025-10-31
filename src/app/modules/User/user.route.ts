import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidationSchemas } from './user.validation';

const router = Router();

router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getMe);

router.post(
  '/register',
  validateRequest(userValidationSchemas.userValidationSchemaforRegister),
  UserController.registerUser,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getAllUser,
);

export const UserRoutes = router;
