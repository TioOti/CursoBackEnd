import express from 'express';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from '../routers/views.router.js';
import productsRouter from '../routers/products.router.js';
import cartsRouter from '../routers/carts.router.js';

const app = express();
const PORT = 8080
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) =>{
    req.io = socketServer;
    next();
})
app.on("error", (error) => console.error(error))

server.on('error', (err) => console.log(err));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);

const socketServer = new Server(server)

socketServer.on("connection", socket => {
    console.log("Server Connected.");

    socket.on("disconnect", socket => {
        console.log("Server Disconnected.");
    });
});