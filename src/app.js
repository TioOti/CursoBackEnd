import express from 'express';
import config from './config/config.js';
import passport from 'passport';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import ProductsRouter from './routers/products.router.js'
import CartsRouter from './routers/carts.router.js';
import UserRouter from "./routers/user.router.js"
import AuthRouter from "./routers/auth.router.js";
import GithubRouter from './routers/github.router.js';
import SessionRouter from './routers/sessions.route.js'
import MocksRouter from './routers/mocks.router.js'
import errorHandler from './middleware/errorHandler.middleware.js'
import loggerTestRouter from './routers/loggerTest.router.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { SwaggerTheme } from 'swagger-themes';

const app = express();
const PORT = config.port || 3000;
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`))

const darkStyle = new SwaggerTheme('v3').getBuffer('dark');
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "eCommerce Coderhouse",
            description: "Documentation for eCommerce APIs",
            version: "1.0.0"
        },
        servers: [
            { url: "http://localhost:3000" }
        ]
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/dark/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs, { customCss: darkStyle }));
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.on("error", (error) => console.error(error))
server.on('error', (err) => console.log(err));
app.use(passport.initialize());

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);
app.use("/views", viewsRouter);
app.use("/api/mock", MocksRouter);
app.use("/api/users", UserRouter);
app.use("/api/sessions", SessionRouter)
app.use("/api/test", loggerTestRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/github", GithubRouter)
app.use(errorHandler);

