import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidationSchemas } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidationSchemas.authValidationSchemaforLogIn),
  AuthController.loginUser,
);

export const AuthRoutes = router;
