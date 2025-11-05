import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidationSchemas } from './blog.validation';
import { BlogController } from './blog.controller';

const router = Router();

router.post(
  '/create-blog',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidationSchemas.blogValidationSchemaforCreate),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidationSchemas.blogValidationSchemaforUpdate),
  BlogController.updateBlog,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BlogController.deleteBlog,
);

router.get('/:id', BlogController.getSingleBlog);

router.get('/', BlogController.getAllBlog);

export const BlogRoutes = router;
