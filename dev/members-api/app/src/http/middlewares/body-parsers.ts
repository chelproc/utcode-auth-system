import * as bodyParser from "body-parser";

export const urlEncodedBodyParser = bodyParser.urlencoded({ extended: true });
export const jsonBodyParser = bodyParser.json();