import { Router } from "express";
import * as csurf from "csurf";

export const router = Router();

export const csrfProtector = csurf();

router.get("/security/csrf", csrfProtector, (req, res) => {
    res.send({
        token: req.csrfToken()
    });
});