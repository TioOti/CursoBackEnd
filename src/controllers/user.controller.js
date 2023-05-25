import * as Constants from './../constants/constants.js';
import factory from '../services/factory.js'
import CustomError from '../utils/customError.js';
import { ERRORS } from '../constants/errors.js';


export async function createUser(req, res, next) {
  try {
    const data = req.body;
    const user = await factory.user.createUser(data);
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
      res.json({
        user,
        status: Constants.STATUS.SUCCESS
      });
    }
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, email)); else next(error);
  }
}

export async function getUsers(req, res, next) {
  try {
    const users = await factory.users.getUsers();
    if(!users){
      throw CustomError.createError(ERRORS.USER_NOT_FOUND);
    } else{
      res.json({
        users: users.users,
        status: Constants.STATUS.SUCCESS
      });
    }
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message)); 
    else next(error);
  }
}

export async function changeRole(req, res, next){
  const { uid } = req.params;
  try {
    let user = await factory.user.getUserById(uid);
    if(!user) throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email); 
    user.role === Constants.PREMIUM ? 
    await factory.user.updateUser(user.email, { ...user, role: Constants.USER }) :
    await factory.user.updateUser(user.email, { ...user, role: Constants.PREMIUM });
    res.json({
      message: Constants.USER_ROLE_CHANGE_SUCCESS,
      status: Constants.STATUS.SUCCESS
    });
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, email)); else next(error);
  }
}


export async function updateUser(req, res, next){
  const { email } = req.params;
  const { body } = req;
  try {
    let user = await factory.user.getUser(email);
    if(!user) {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email); 
    } else {
      user = await factory.user.updateUser(email, body);
      res.json({
        user,
        status: Constants.STATUS.SUCCESS
      });
    }
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, email)); else next(error);
  }
}

export async function updatePassword(req, res, next){
  const { email } = req.params;
  const { body } = req;
  try {
    let user = await factory.user.getUser(email);
    if(!user) {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email); 
    } else {
      user = await factory.user.updateUser(email, { password: body.password }, true);
      res.json({
        user,
        status: Constants.STATUS.SUCCESS
      });
    }
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, email)); else next(error);
  }
}

export async function deleteUsers(req, res, next){
  try{
    await factory.user.deleteUsers();
    res.status(204).send();
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message)); else next(error);
  }}