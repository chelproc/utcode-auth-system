import * as Express from "express";
import { router as authRouter } from "./auth";
import { router as profileRouter } from "./profile";
import { router as notificationRouter } from "./notification";

export const router = Express.Router();
router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/notification", notificationRouter);