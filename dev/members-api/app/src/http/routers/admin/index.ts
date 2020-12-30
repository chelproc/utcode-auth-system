import * as Express from "express";
import { router as inviteUserRouter } from "./invite-user";

export const router = Express.Router();
router.use("/invite-user", inviteUserRouter);