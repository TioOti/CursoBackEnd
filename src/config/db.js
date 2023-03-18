import mongoose from "mongoose";
import config from "./config.js";
export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongoURI, (err) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("🚀 Conected to MongoDB");
      }
    });
  }
  
  static getInstance(){
    if(this.#instance){
      console.log("Already connected to MongoDB 🚀")
      return this.#instance
    }
    this.#instance = new MongoSingleton();
    return this.#instance;
  }
}
