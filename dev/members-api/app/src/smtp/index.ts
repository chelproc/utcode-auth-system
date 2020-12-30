import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import { User } from "../models/user";
import { notifyUser } from "../actions/notification";

export function startSmtpServer() {
    const smtpServer = new SMTPServer({
        disabledCommands: ["AUTH"]
    });
    smtpServer.onData = async (stream, session, callback) => {
        stream.on("end", callback);
        const parsedEmail = await simpleParser(stream);
        for (let email of parsedEmail.to.value) {
            const matchedArray = email.address.match(/^(.+)@utcode.net$/);
            if (matchedArray && matchedArray[1]) {
                const targetUser = await User.findOne({ where: { username: matchedArray[1] } });
                if (targetUser) notifyUser(targetUser, parsedEmail.subject, parsedEmail.text);
            }
        }
    }
    
    smtpServer.listen(10025);
}