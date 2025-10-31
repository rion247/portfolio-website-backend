import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import validateRequest from '../../middleware/validateRequest';
import { MessageValidationSchemas } from './message.validation';
import { MessageController } from './message.controller';

const router = Router();

router.post(
  '/create-message',
  auth(USER_ROLE.user),
  validateRequest(MessageValidationSchemas.messageValidationSchemaforCreate),
  MessageController.createMessage,
);
export const MessageRoutes = router;
