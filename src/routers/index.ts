import { Router } from 'express';
import authRoute from './auth.route';
import jobRoute from './job.route';

const router = Router();

interface IRoute{
    path: string;
    route: Router;
}

const proRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/jobs',
    route: jobRoute,
  },
];


proRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;