import { Router } from "express";
import * as userHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const userEndpoints = Router();
userEndpoints.get("", userHandler.findAllUser);
userEndpoints.post("/auth/register", userHandler.register);
userEndpoints.post("/auth/login", userHandler.login);
userEndpoints.delete("/:userId", authMiddleware, userHandler.removeUser);
userEndpoints.put("/:userId", authMiddleware, userHandler.updateUser);
export default userEndpoints;
//# sourceMappingURL=endpoints.js.map