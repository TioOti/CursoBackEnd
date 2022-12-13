import express from 'express';
import cartsRouter from '../routers/carts.router.js';
import productsRouter from '../routers/products.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT=process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`))
server.on('error', (err) => console.log(err));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter)

