import "reflect-metadata";
import setupDb from "./loaders/database";
import setupExpress from "./loaders/express";
import setupEmail from "./loaders/email";
import { config } from "dotenv";
import { setUpPlugins } from "./loaders/plugins";

export async function bootLoaders() {
    process.env.DOTENV_KEY ? config() : config({ path: '.env' });
    // config({ path: `.env.${process.env.NODE_ENV}` });
    setupEmail();
    await setupDb();
    setupExpress(Number(process.env.PORT));
    setUpPlugins();

}

// if (process.env.NODE_ENV !== "test") {
bootLoaders().then(() => {
    console.log("Boot loaders complete");
})
// }
