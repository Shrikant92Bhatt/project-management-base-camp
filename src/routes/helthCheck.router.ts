import { Router } from "express";
import { healthCheckController } from "../controller/index";

const router = Router();

router.get("/", healthCheckController);

export default router;