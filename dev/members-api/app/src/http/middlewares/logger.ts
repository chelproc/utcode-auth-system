import { RequestHandler } from "express";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.url + " " + JSON.stringify(req.headers));
    next();
}