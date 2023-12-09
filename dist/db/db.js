import { Sequelize } from "sequelize-typescript";
import { entities } from "./entities.js";
export const sequelize = new Sequelize(process.env.DB_POSTGRES, {
    models: entities,
    repositoryMode: true,
});
//# sourceMappingURL=db.js.map