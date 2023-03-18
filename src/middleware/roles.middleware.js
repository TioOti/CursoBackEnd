import * as Constants from '../constants/constants.js'

export function adminRole(req, res, next){
    const user = req.user;
    if (!user || user.role !== Constants.ADMIN){
        res.status(403).json({
            message: Constants.UNAUTHORIZED_OPERATION,
            status: Constants.STATUS.FAILED
        });
    } else return next();
}

export function userRole(req, res, next){
    const user = req.user;
    if(!user || user.role !== Constants.USER){
        res.status(403).json({
            message: Constants.UNAUTHORIZED_OPERATION,
            status: Constants.STATUS.FAILED
        });
    } else return next ();
}