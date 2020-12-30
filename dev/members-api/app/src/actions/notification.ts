import { User } from "../models/user";
import { NotificationEmail } from "../models/notification-email";
import { NotificationLine } from "../models/notification-line";
import { createTransport } from "nodemailer";
import Axios from "axios";
import * as querystring from "querystring";

const smtpTransport = createTransport({
    host: "smtp",
    port: 25
});
export function notifyWithEmail(notificationEmails: NotificationEmail[], subject: string, text: string) {
    return smtpTransport.sendMail({
        from: "noreply@utcode.net",
        to: notificationEmails.map(item => item.email),
        subject,
        text
    });
}
export function notifyWithLine(notificationLine: NotificationLine, subject: string, text: string) {
    return Axios.post("https://notify-api.line.me/api/notify", querystring.stringify({
        message: subject + "\n\n" + text
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + notificationLine.accessToken
        }
    });
}
export async function notifyUser(user: User, subject: string, text: string) {
    const [notificationEmails, notificationLines] = await Promise.all([
        NotificationEmail.find({ where: { user: user } }),
        NotificationLine.find({ where: { user: user } })
    ]);
    notifyWithEmail(notificationEmails, subject, text);
    for (let notificationLine of notificationLines) {
        notifyWithLine(notificationLine, subject, text);
    }
}