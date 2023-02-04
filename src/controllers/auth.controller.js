import * as AuthService from "../services/auth.service.js";
import { STATUS } from "../constants/constants.js";

export async function apilogin(req, res) {
  try {
    const { email, password } = req.body;
    const authenticated = await AuthService.login(email, password);
    if (authenticated) {
      req.session.authenticated = true;
      res.json({
        message: "User was successfully authenticated.",
        status: STATUS.SUCCESS
      });
    } else {
      res.status(404).json({
        message: "No user was found with that email",
        status: STATUS.FAILED
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
      status: STATUS.SUCCESS
    })
  }
}

export async function login (req, res) {
  try {
    const {email, password} = req.body;
    if(email && password){
      const authenticated = await AuthService.login(email, password);
      if(authenticated){
        req.session.authenticated = true;
        req.session.userEmail = email;
        res.redirect("products");
      } else { 
        res.render("login", { error: "Invalid Username or password. Please try again" });
      }
    } else res.render("login");
  } catch (error) {
    res.render("login", {error: error.message});
  }
}



export async function apilogout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.json(err);
      } else {
        res.send("Salio de la aplicación");
      }
    });
  } catch (error) {
    res.json({
        error: error.message,
        status: STATUS.SUCCESS
    })
  }
}

export async function logout (req, res) {
  try {
    req.session.destroy((error) => {
      if(error){
        res.render("login", { error: error.message });
      } else res.render("login", { success: "Your session was succesfully logged out." });
    });
  } catch (error) {
    res.render("login", { error: error.message });
  }
}

