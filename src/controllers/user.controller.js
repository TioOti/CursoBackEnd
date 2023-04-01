import * as Constants from './../constants/constants.js';
import factory from '../services/factory.js'
import CustomError from '../utils/customError.js';
import { ERRORS } from '../constants/errors.js';

export async function createUser(req, res, next) {
  try {
    const data = req.body;
    const user = await factory.user.createUser(data);
    delete user.password;
    res.status(201).json({
      user,
      status: Constants.STATUS.SUCCESS,
    });
  } catch (error) {
    next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, data.email));}
}

export async function getUser(req, res) {
  const { email } = req.params;
  try {
    const user = await factory.user.getUser(email);
    if (!user) {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email); 
    } else {
      delete user.password;
      res.json({
        user,
        status: Constants.STATUS.SUCCESS
      });
    }
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, email)); else next(error);
  }
}