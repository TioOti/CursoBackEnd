import { VALID_TOKEN, STATUS } from './../constants/constants.js';
import { ERRORS } from '../constants/errors.js';
import CustomError from '../utils/customError.js';

export function getCurrentUser(req, res) {
    try {  
      res.json({
            message: VALID_TOKEN, 
            user: req.user
      });
    } catch (error){
        throw CustomError.createError(ERRORS.UNHANDLED_ERROR);
    }
  }