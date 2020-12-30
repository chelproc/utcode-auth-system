import * as Express from "express";
import * as t from "io-ts";
import { In } from "typeorm";
import { AuthGoogle } from "../../../models/auth-google";
import { requireLogin } from "../../middlewares/require-login";
import { csrfProtector } from "../csrf";
import { jsonBodyParser } from "../../middlewares/body-parsers";

export const router = Express.Router();

// GET /client/auth/all
router.get("/all", requireLogin, async (req, res) => {
    const google = await AuthGoogle.find({
        where: {
            user: req.user!
        }
    });
    res.send({
        google: google.map(item => ({
            id: item.id,
            email: item.email
        }))
    });
});

// POST /client/auth/google/delete
const deleteClientAuthGoogleBody = t.type({
    id: t.array(t.number)
});
router.post("/google/delete", requireLogin, csrfProtector, jsonBodyParser, async (req, res) => {
    if (!deleteClientAuthGoogleBody.is(req.body)) return res.sendStatus(400);

    await AuthGoogle.delete({ id: In([req.body.id]), user: req.user });
    res.sendStatus(200);
});
