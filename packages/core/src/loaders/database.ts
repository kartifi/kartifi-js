import { DataSource } from "typeorm";
import { cwd } from "process";
import { ProductSeeder } from "../database/seeders/product.seeder";
import { CustomerSeeder } from "../database/seeders/customer.seeder";
import { StoreSettingsSeeder } from "../database/seeders/store-settings.seeder";

export var db: DataSource;

export default async function () {
    db = new DataSource({
        type: "postgres",
        port: 5432,
        logging: false,
        host: process.env.POSTGRESQL_HOST,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: !(process.env.NODE_ENV === "prod"),
        dropSchema: !(process.env.NODE_ENV === "prod"),
        entities: [
            cwd() + "/dist/src/api/v1/models/*.js"
        ],

    });
    await db.initialize();

    new CustomerSeeder().run();
    new ProductSeeder().run();
    new StoreSettingsSeeder().run();
}