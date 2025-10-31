import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProjectRoutes } from '../modules/Project/project.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { MessageRoutes } from '../modules/Message/message.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/project', route: ProjectRoutes },
  { path: '/blog', route: BlogRoutes },
  { path: '/message', route: MessageRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
