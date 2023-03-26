import * as Constants from '../constants/constants.js'
import {ERRORS} from '../constants/errors.js'
import CustomError from './../utils/customError.js';


export function adminRole(req, res, next) {
    const user = req.user;
    if (!user || user.role !== Constants.ADMIN) {
        throw CustomError.createError(ERRORS.UNAUTHORIZED_OPERATION, user.email);
    } else return next();
}

export function userRole(req, res, next){
    const user = req.user;
    if(!user || user.role !== Constants.USER){
        throw CustomError.createError(ERRORS.UNAUTHORIZED_OPERATION, user.email);
    } else return next();
}