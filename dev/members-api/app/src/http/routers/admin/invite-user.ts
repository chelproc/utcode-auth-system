import Axios from "axios";
import * as cryptoRandomString from "crypto-random-string";
import * as Express from "express";
import * as t from "io-ts";
import * as querystring from "querystring";
import { QueryFailedError } from "typeorm";
import { AuthNewcomer } from "../../../models/auth-newcomer";
import { RequestWithUser, User } from "../../../models/user";
import { PermissionType } from "../../../settings/permission-type";
import { jsonBodyParser } from "../../middlewares/body-parsers";
import { requirePermission } from "../../middlewares/require-login";
import { csrfProtector } from "../csrf";

export const router = Express.Router();

// POST /admin/invite-user/create
const postAdminInviteUserCreateBody = t.type({
    username: t.string,
    nickname: t.string,
    fullname: t.string,
    affiliation: t.string,
    joinedAt: t.string
});
router.post("/create", csrfProtector, requirePermission(PermissionType.NEW_USER), jsonBodyParser, async (req: RequestWithUser, res) => {
    if (!(
        postAdminInviteUserCreateBody.is(req.body) &&
        /^[a-z][a-z0-9]{5,}$/.test(req.body.username) &&
        req.body.nickname.length >= 4 &&
        req.body.fullname.length >= 3 &&
        req.body.affiliation.length >= 3 &&
        /^2\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|30|31)$/.test(req.body.joinedAt)
    )) return res.sendStatus(400);

    try {
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.nickname = req.body.nickname;
        newUser.fullname = req.body.fullname;
        newUser.affiliation = req.body.affiliation;
        const today = new Date();
        newUser.joinedAt = req.body.joinedAt;
        await newUser.save();

        const newUserAuth = new AuthNewcomer();
        newUserAuth.user = newUser;
        const newUserAuthExpireAt = new Date();
        newUserAuthExpireAt.setDate(newUserAuthExpireAt.getDate() + 7);
        newUserAuth.expireAt = newUserAuthExpireAt;
        newUserAuth.hash = cryptoRandomString({length: 20});
        await newUserAuth.save();

        return res.status(200).send({
            hash: newUserAuth.hash
        });
    } catch(e) {
        if (e instanceof QueryFailedError) {
            return res.status(500).send("Query failed.");
        }
    }
});

// POST /admin/invite-user/check
const postAdminInviteUserCheckBody = t.type({
    username: t.string
});
router.post("/check", csrfProtector, requirePermission(PermissionType.NEW_USER), jsonBodyParser, async (req: RequestWithUser, res) => {
    if (!(
        postAdminInviteUserCheckBody.is(req.body) &&
        /^[a-z][a-z0-9]{5,}$/.test(req.body.username)
    )) return res.sendStatus(400);

    try {
        if (await User.findOne({ where: { username: req.body.username } })) {
            return res.status(200).send({
                exists: true
            });
        } else {
            return res.status(200).send({
                exists: false
            });
        }
    } catch(e) {
        if (e instanceof QueryFailedError) {
            return res.status(500).send("Query failed.");
        }
    }
});