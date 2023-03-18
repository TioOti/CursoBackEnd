import config from "../config/config.js";
import { PERSISTENCE } from "../constants/constants.js";
import MongoSingleton from "../config/db.js";
import { UserRepository } from "./UserDAOs/user.repository.js";
import { ProductRepository } from "./productDAOs/product.repository.js";
import { CartRepository } from './cartDAOs/cart.repository.js'
import { TicketRepository } from './ticketDAOs/ticket.repository.js';

let factory;
 switch (config.persistence) {
    case PERSISTENCE.MONGO:
        if (config.mongoURI) MongoSingleton.getInstance();
        const userMongo = await import ('./UserDAOs/user.service.js')
        const productMongo = await import ('./productDAOs/product.service.js')
        const cartMongo = await import ('./cartDAOs/cart.service.js')
        const ticketMongo = await import ('./ticketDAOs/ticket.service.js');
        factory = {
            user: new UserRepository(userMongo),
            product: new ProductRepository(productMongo),
            cart: new CartRepository(cartMongo),
            ticket: new TicketRepository(ticketMongo)
        };
        break;
    case PERSISTENCE.FILE:
        break;
    default:
        break;
}

export default factory;