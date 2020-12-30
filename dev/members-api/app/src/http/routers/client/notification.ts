import * as EmailValidator from "email-validator";
import * as Express from "express";
import * as t from "io-ts";
import { In } from "typeorm";
import { formatDateToString } from "../../../lib/datetime";
import { jsonBodyParser } from "../../middlewares/body-parsers";
import { requireLogin } from "../../middlewares/require-login";
import { NotificationEmail } from "../../../models/notification-email";
import { NotificationLine } from "../../../models/notification-line";
import { csrfProtector } from "../csrf";
import { notifyUser } from "../../../actions/notification";

export const router = Express.Router();

// GET /client/notification/all
router.get("/all", requireLogin, async (req, res) => {
    const [notificationEmails, notificationLines] = await Promise.all([
        NotificationEmail.find({ where: { user: req.user! } }),
        NotificationLine.find({ where: { user: req.user! } }),
    ]);
    res.send({
        email: notificationEmails,
        line: notificationLines.map(item => ({
            id: item.id,
            target: item.target
        }))
    });
});

// POST /client/notification/test
router.post("/test", requireLogin, csrfProtector, async (req, res) => {
    await notifyUser(req.user, "通知機能確認", "このメッセージは、通知アカウントが正しく設定されているかを確認するためのメッセージです。このメッセージが見えていれば、アカウントは正しく設定されています。");
    res.sendStatus(200);
});

// POST /client/notification/email/add
const postClientNotificationEmailAddBody = t.type({
    address: t.string
});
router.post("/email/add", requireLogin, csrfProtector, jsonBodyParser, async (req, res) => {
    if (!postClientNotificationEmailAddBody.is(req.body)) return res.sendStatus(400);
    if (!EmailValidator.validate(req.body.address)) return res.status(400).send("The email address is not valid.");

    const existingRecord = await NotificationEmail.findOne({ where: { user: req.user, email: req.body.address } });
    if (existingRecord) return res.status(409).send("The e-mail address already exists.");

    const newRecord = new NotificationEmail();
    newRecord.user = req.user;
    newRecord.email = req.body.address;
    await newRecord.save();
    res.sendStatus(200);
});

// POST /client/notification/email/delete
const postClientNotificationEmailDeleteBody = t.type({
    id: t.array(t.number)
});
router.post("/email/delete", requireLogin, csrfProtector, jsonBodyParser, async (req, res) => {
    if (!postClientNotificationEmailDeleteBody.is(req.body)) return res.sendStatus(400);

    await NotificationEmail.delete({ id: In([req.body.id]), user: req.user });
    res.sendStatus(200);
});

// POST /client/notification/email/delete
const postClientNotificationLineDeleteBody = t.type({
    id: t.array(t.number)
});
router.post("/line/delete", requireLogin, csrfProtector, jsonBodyParser, async (req, res) => {
    if (!postClientNotificationLineDeleteBody.is(req.body)) return res.sendStatus(400);

    await NotificationLine.delete({ id: In([req.body.id]), user: req.user });
    res.sendStatus(200);
});
