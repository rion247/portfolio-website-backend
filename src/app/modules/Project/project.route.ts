import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { ProjectController } from './project.controller';
import validateRequest from '../../middleware/validateRequest';
import { ProjectValidationSchemas } from './project.validation';

const router = Router();

router.post(
  '/create-project',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(ProjectValidationSchemas.projectValidationSchemaforCreate),
  ProjectController.createProject,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(ProjectValidationSchemas.projectValidationSchemaforUpdate),
  ProjectController.updateProject,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  ProjectController.deleteProject,
);

router.get('/:id', ProjectController.getSingleProject);

router.get('/', ProjectController.getAllProject);

export const ProjectRoutes = router;
