import * as csrf from "csrf";
import { Router } from "express";
import * as querystring from "querystring";
import { LineNotifyConfig } from "../../settings/line-notify";
import { requireLogin } from "../middlewares/require-login";
import { urlEncodedBodyParser } from "../middlewares/body-parsers";
import { Environment } from "../../settings/environment";
import Axios from "axios";
import * as t from "io-ts";
import { returnToSetter, returnToRedirector } from "../middlewares/return-to";
import { NotificationLine } from "../../models/notification-line";
import { RequestWithUser } from "../../models/user";

export const router = Router();
const lineNotifyCsrfTokenGenerator = new csrf();

// GET /notification/line/redirect
router.get("/line/redirect", requireLogin, returnToSetter, async (req, res) => {
    const csrfSecret = await lineNotifyCsrfTokenGenerator.secret();
    const csrfToken = lineNotifyCsrfTokenGenerator.create(csrfSecret);

    req.session!.lineNotifyCsrfSecret = csrfSecret;
    res.redirect("https://notify-bot.line.me/oauth/authorize?" + querystring.stringify({
        response_type: "code",
        client_id: LineNotifyConfig.clientId,
        redirect_uri: Environment.baseUrl + "/notification/line/callback",
        scope: "notify",
        state: csrfToken,
        response_mode: "form_post"
    }));
});

// POST /api/notification/line/callback
const postNotificationLineCallbackBody = t.type({
    code: t.string,
    state: t.string
});
const lineNotifyStatusCheckApiResult = t.type({
    status: t.number,
    message: t.string,
    targetType: t.union([t.literal("USER"), t.literal("GROUP")]),
    target: t.string
});
router.post("/line/callback", requireLogin, urlEncodedBodyParser, async (req: RequestWithUser, res, next) => {
    if (!(
        postNotificationLineCallbackBody.is(req.body) &&
        lineNotifyCsrfTokenGenerator.verify(req.session!.lineNotifyCsrfSecret, req.body.state)
    )) return res.sendStatus(403);

    // アクセストークンの取得
    const code: string | undefined = req.body.code;
    if (typeof code !== "string") return res.sendStatus(403);
    const tokenEndpointResult = await Axios.post("https://notify-bot.line.me/oauth/token", querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: Environment.baseUrl + "/notification/line/callback",
        client_id: LineNotifyConfig.clientId,
        client_secret: LineNotifyConfig.clientSecret
    }), {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    });
    const accessToken = tokenEndpointResult.data.access_token;
    if (!(
        tokenEndpointResult.status === 200 &&
        typeof accessToken === "string"
    )) return res.status(403).send("Access token acquisition failed.");

    // 通知先情報の取得
    const accountStatus = await Axios.get("https://notify-api.line.me/api/status", {
        headers: {"Authorization": "Bearer " + accessToken}
    });
    if (!lineNotifyStatusCheckApiResult.is(accountStatus.data)) return res.status(403).send("Account status acquisition failed.");
        
    const insertedData = new NotificationLine();
    insertedData.user = req.user!;
    insertedData.accessToken = accessToken;
    insertedData.target = accountStatus.data.target;
    await insertedData.save();
    next();
}, returnToRedirector);