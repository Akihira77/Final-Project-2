import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "./.env" });
}
else {
    dotenv.config();
}
export const { PORT, JWT_SECRET, DB_POSTGRES, NODE_ENV } = process.env;
//# sourceMappingURL=config.js.map