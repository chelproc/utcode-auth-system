import * as Express from "express";
import * as ExpressSession from "express-session";
import * as helmet from "helmet";
import { router as authRouter } from "./routers/auth";
import { router as csrfRouter } from "./routers/csrf";
import { router as notificationRouter } from "./routers/notification";
import { router as clientRouter } from "./routers/client/index";
import { router as adminRouter } from "./routers/admin/index";
import { loggerMiddleware } from "./middlewares/logger";
import { Environment } from "../settings/environment";
const MemoryStore = require("memorystore")(ExpressSession);

export function startHttpServer() {
    const app = Express();
    if (Environment.isProduction) app.use(helmet());
    app.use(ExpressSession({
        cookie: {
            domain: Environment.cookieDomain,
            httpOnly: true
        },
        name: "sessionId",
        secret: "session-secret-utcode",
        resave: false,
        saveUninitialized: true,
        store: new MemoryStore({
            checkPeriod: 86400000
        })
    }));

    app.use(loggerMiddleware)
    app.use(csrfRouter);
    app.use(authRouter);
    app.use("/notification/", notificationRouter);
    app.use("/client/", clientRouter);
    app.use("/admin/", adminRouter);

    app.listen(8080);
}