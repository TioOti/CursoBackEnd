import dotenv from 'dotenv'
dotenv.config();
import {Command} from "commander";

const program = new Command();

program.option("-p, --persistence <type>", "Selected Persistence/DAO").parse();

export default { 
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    persistence : program.opts().persistence || process.env.PERSISTENCE || "MONGO",
    node_env: process.env.NODE_ENV || 'dev',
    secret: process.env.SECRET,
    githubClientId: process.env.CLIENT_ID,
    githubClientSecret: process.env.CLIENT_SECRET,
    githubCallbackUrl: process.env.CALLBACK_URL,
    stripeSecret: process.env.STRIPE_SECRET,
    
}

