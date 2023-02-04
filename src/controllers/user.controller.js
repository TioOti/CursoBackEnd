import { STATUS } from "../constants/constants.js";
import * as UserService from "../services/user.service.js";

export async function createUser(req, res) {
  try {
    const data = req.body;
    const response = await UserService.createUser(data);
    res.status(201).json({
      user: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAILED,
    });
  }
}

export async function createUserFromForm (req, res) {
  try {
    const data = req.body;
    const user = await UserService.createUser(data);
    req.session.authenticated = true;
    req.session.userEmail = user.email;
    res.redirect("products");
  } catch (error) {
    res.render("registration"), { error: error.message };
  }
}

export async function getUser(req, res) {
  try {
    const { email } = req.params;
    const user = await UserService.getUser(email);
    if (user) {
      delete user.password;
      res.json({ user });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAILED,
    });
  }
}

