import { RequestHandler } from "express";
import { RequestWithUser } from "../../models/user";
import { Permission } from "../../models/permission";
import { PermissionType } from "../../settings/permission-type";

export const requireLogin: RequestHandler = (req: RequestWithUser, res, next) => {
    if (req.user && req.user.id) {
        next();
    } else {
        res.sendStatus(401);
    }
}
export function requirePermission(permission: PermissionType): RequestHandler {
    return async (req: RequestWithUser, res, next) => {
        if (!(req.user && req.user.id)) { res.sendStatus(401); return; }
        if (!await Permission.findOne({ where: [
            { user: req.user, type: permission },
            { user: req.user, type: PermissionType.ADMIN }
        ] })) { res.sendStatus(403); return; }
        next();
    }
}