import { Router } from "express";
import * as userHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userEndpoints = Router();

userEndpoints.get("", userHandler.findAllUser);
userEndpoints.post("/register", userHandler.register);
userEndpoints.post("/login", userHandler.login);
userEndpoints.delete("/:userId", authMiddleware, userHandler.removeUser);
userEndpoints.put("/:userId", authMiddleware, userHandler.updateUser);

export default userEndpoints;
