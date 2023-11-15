import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "./.env" });
}
else {
    dotenv.config();
}
export const { PORT, JWT_SECRET, DB_DIALECT_DEV, DB_DIALECT_TEST, DB_HOST_DEV, DB_HOST_TEST, DB_NAME_DEV, DB_NAME_TEST, DB_PASSWORD_DEV, DB_PASSWORD_TEST, DB_USERNAME_DEV, DB_USERNAME_TEST, DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, } = process.env;
//# sourceMappingURL=config.js.map