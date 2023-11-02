import { Sequelize } from "sequelize-typescript";
import { entities } from "./entities.js";
export const sequelize = new Sequelize({
    database: process.env.DB_NAME_DEV,
    dialect: "postgres",
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    port: Number(process.env.DB_HOST_DEV),
    models: entities,
    repositoryMode: true,
});
//# sourceMappingURL=db.js.map