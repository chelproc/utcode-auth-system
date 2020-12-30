import ormconfig from "./settings/ormconfig";
import { createConnection } from "typeorm";
import { startHttpServer } from "./http";
import { startSmtpServer } from "./smtp";
import { startInternalHttpServer } from "./http-internal";

createConnection(ormconfig);

startInternalHttpServer();
startHttpServer();
startSmtpServer();