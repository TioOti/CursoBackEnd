import express from 'express';
import dotenv from "dotenv";
dotenv.config();
if (process.env.MONGO_URI) import("./config/db.js");
import cookie from 'cookie-parser'
import session from "express-session";
import mongoStore from "connect-mongo";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js';
import "./config/db.js"
import UserRouter from "./routers/user.router.js"
import AuthRouter from "./routers/auth.router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`))

app.use(
    session({
      store: new mongoStore({
        mongoUrl: process.env.MONGO_URI,
        options: {
          userNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000000 },
    }),
  );

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.on("error", (error) => console.error(error))
server.on('error', (err) => console.log(err));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);

