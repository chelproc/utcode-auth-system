import * as Express from "express";
import { User } from "../models/user";

export function startInternalHttpServer() {
    const app = Express();

    app.get("/profile/:username", async (req, res) => {
        const username = req.params.username;
        if (!username) return res.sendStatus(400);
        const user = await User.findOne({ where: { username } });
        if (!user) return res.sendStatus(404);
        return res.send({
            nickname: user.nickname
        });
    });

    app.listen(8081);
}