import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyJWT } from "../utils/auth.util";

const router = Router();

router.get("/getProfileData", verifyJWT, userController.getProfileData);

export default router;
