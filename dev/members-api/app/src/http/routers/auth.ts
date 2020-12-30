import { Router } from "express";
import * as Passport from "passport";
import { User, RequestWithUser } from "../../models/user";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AuthGoogle } from "../../models/auth-google";
import { AuthNewcomer } from "../../models/auth-newcomer";
import { MoreThan } from "typeorm";
import { Environment } from "../../settings/environment";
import { returnToSetter, returnToRedirector } from "../middlewares/return-to";

export const router = Router();

Passport.serializeUser<User, string>((user, done) => {
    done(null, user.id.toString());
});
Passport.deserializeUser<User, string>(async (id, done) => {
    const user = await User.findOne(id);
    if (user) done(null, user);
    else done("User not found.");
});
Passport.use(new GoogleStrategy({
    clientID: "238246732557-em8a695uem3e2ug934g1ke4n2i26dgi0.apps.googleusercontent.com",
    clientSecret: "AZ9umxoiEZm0cwgDrUIfHQH7",
    scope: ["openid", "email"],
    callbackURL: Environment.baseUrl + "/auth/google/callback",
    passReqToCallback: true
}, async (req: RequestWithUser, accessToken, refreshToken, profile, done) => {
    if (req.user && req.session!.addGoogleAccount) {
        const newAuthInfo = new AuthGoogle();
        newAuthInfo.user = req.user;
        newAuthInfo.profileId = profile.id;
        newAuthInfo.email = profile.emails![0].value;
        newAuthInfo.save();
        delete req.session!.addGoogleAccount;
        done(undefined, req.user);
    } else {
        const authGoogleInfo = await AuthGoogle.findOne({ where: { profileId: profile.id }, relations: ["user"] });
        if (authGoogleInfo && authGoogleInfo.user) { done(undefined, authGoogleInfo.user); }
        else done("Login failed.");
    }
}));

router.use(Passport.initialize());
router.use(Passport.session());

router.get("/auth/google/redirect", returnToSetter, (req, res, next) => {
    if (req.query.add) req.session!.addGoogleAccount = 1;
    next();
}, Passport.authenticate("google"));
router.get("/auth/google/callback", Passport.authenticate("google", {
    failureRedirect: "/"
}), returnToRedirector);

router.get("/auth/newcomer/:hash", async (req, res) => {
    if (!req.params.hash) return res.sendStatus(400);
    const authNewcomerInfo = await AuthNewcomer.findOne({where: {
        hash: req.params.hash,
        expireAt: MoreThan(new Date())
    }, relations: ["user"]});
    if (authNewcomerInfo && authNewcomerInfo.user) {
        await authNewcomerInfo.remove();
        req.login(authNewcomerInfo.user, () => {
            res.redirect(Environment.clientBaseUrl + "/?newcomer")
        });
    } else {
        res.sendStatus(403);
    }
});

router.get("/auth/is-logged-in", (req, res) => {
    if (req.user) {
        res.setHeader("X-User", req.user.username);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});
