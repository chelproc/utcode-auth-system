import { RequestHandler } from "express";
import { RequestWithUser } from "../../models/user";
import { isValidRedirectUrl } from "../../lib/redirect-uri";

export const returnToSetter: RequestHandler = (req: RequestWithUser, res, next) => {
    const returnTo = req.query.returnTo;
    if (typeof returnTo === "string" && isValidRedirectUrl(returnTo)) {
        req.session!.returnTo = returnTo;
        next();
    } else {
        res.sendStatus(403);
    }
}
export const returnToRedirector: RequestHandler = (req: RequestWithUser, res, next) => {
    const returnTo = req.session!.returnTo;
    if (typeof returnTo === "string" && isValidRedirectUrl(returnTo)) {
        delete req.session!.returnTo;
        res.redirect(returnTo);
    } else {
        res.sendStatus(403);
    }
}