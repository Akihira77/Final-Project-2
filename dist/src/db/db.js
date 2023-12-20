import { Sequelize } from "sequelize-typescript";
import { entities } from "./entities.js";
import { DB_POSTGRES, NODE_ENV } from "../config/config.js";
const connectionString = DB_POSTGRES;
export const sequelize = new Sequelize(connectionString, {
    models: entities,
    repositoryMode: true,
    logging: NODE_ENV !== "test"
});
//# sourceMappingURL=db.js.map