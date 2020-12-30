import { Router, Request } from "express";
import { requireLogin } from "../../middlewares/require-login";
import { RequestWithUser, User } from "../../../models/user";
import { Permission } from "../../../models/permission";

export const router = Router();

router.get("/info", requireLogin, async (req: RequestWithUser, res) => {
    res.send(JSON.stringify({
        username: req.user!.username,
        nickname: req.user!.nickname,
        fullname: req.user!.fullname,
        affiliation: req.user!.affiliation,
        joinedAt: req.user!.joinedAt,
        permissions: (await Permission.find({ where: { user: req.user } })).map(item => item.type)
    }));
});