import { Sequelize } from "sequelize-typescript";
import { entities } from "./entities.js";
import { DB_POSTGRES } from "../config/config.js";

const connectionString = DB_POSTGRES!;
export const sequelize = new Sequelize(connectionString, {
	// database: process.env.DB_NAME ?? process.env.DB_NAME_DEV,
	// dialect: "postgres",
	// username: process.env.DB_USERNAME ?? process.env.DB_USERNAME_DEV,
	// password: process.env.DB_PASSWORD ?? process.env.DB_PASSWORD_DEV,
	// port: Number(process.env.DB_PORT ?? process.env.DB_PORT_DEV),
	// host: process.env.DB_HOST ?? process.env.DB_HOST_DEV,
	models: entities, // or [Player, Team],

	repositoryMode: true,
});
