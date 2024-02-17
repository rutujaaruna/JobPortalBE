import { Router } from "express";
import authRoute from "./auth.route";
import jobRoute from "./job.route";
import userRoute from "./user.route";

const router = Router();

interface IRoute {
  path: string;
  route: Router;
}

const proRoute: IRoute[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/jobs",
    route: jobRoute,
  },
];

proRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
