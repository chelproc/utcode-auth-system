import { ConnectionOptions } from "typeorm";
import { AuthGoogle } from "../models/auth-google";
import { AuthNewcomer } from "../models/auth-newcomer";
import { NotificationEmail } from "../models/notification-email";
import { User } from "../models/user";
import { Permission } from "../models/permission";
import { NotificationLine } from "../models/notification-line";

export default {
    type: process.env.DB_TYPE as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: false,
    logging: false,
    entities: [
        User,
        AuthGoogle,
        AuthNewcomer,
        NotificationEmail,
        NotificationLine,
        Permission
    ]
} as ConnectionOptions;