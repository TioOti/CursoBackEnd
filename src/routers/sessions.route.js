import { Router } from "express";
import { getCurrentUser } from '../controllers/session.controller.js';
import passport from '../utils/passport.util.js';
import { STATUS, MISSING_INVALID_TOKEN } from '../constants/constants.js';

const SessionRouter = new Router();

SessionRouter.get("/unauthenticated", (req, res) => {
    res.status(401).json({
        message: MISSING_INVALID_TOKEN,
        status: STATUS.FAILED
    });
});

SessionRouter.get('/current', passport.authenticate('current', { session: false, failureRedirect: '/api/sessions/unauthenticated' }), getCurrentUser);

export default SessionRouter;