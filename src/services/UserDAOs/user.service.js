import { UserModel } from '../../models/user.model.js';
import { ERRORS } from '../../constants/errors.js';
import bcrypt from 'bcrypt';
import CustomError from '../../utils/customError.js';
import EmailSender from '../../utils/emailSender.js'

export async function getUser(){
  return await UserModel.find({deletedAt: { $exists: true}});
}

export async function createUser(data) {
  const userRegistered = await getUser(data.email);
  if (userRegistered) {
    throw CustomError.createError(ERRORS.EMAIL_ALREADY_USED, null, data.email);
  } else {
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
    const user = await UserModel.create(data);
    return user;
  }
}

export async function updateLastConnection(email){
  await UserModel.findOneAndUpdate({email}, {lastConnection: Date.now()});
}

export async function updateUser(email, data, updatePassword = false){
  if(updatePassword){
    if(await validPassword(email, data.password)) data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  } else {
    delete data.password;
  }
  const user = await UserModel.findOneAndUpdate({ email }, data, { new: true });
  return user;
}

async function validPassword(email, newPassword){
  const user = await getUser(email);
  if(user){
    if(bcrypt.compareSync(newPassword, user.password)) throw CustomError.createError(ERRORS.PASSWORD_ALREADY_USED, null, email);
  } else throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email);
  return true;
}

export async function deleteUsers(){
  const date = new Date();
  date.setDate(date.getDate() - 2);
  const users = await UserModel.find({ last_connection: { $lte: date }, deletedAt: { $exists: false } });
  await UserModel.delete({ last_connection: { $lte: date } });
  users.forEach(user => sendEmail(user._doc));
  return users;
}