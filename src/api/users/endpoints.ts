import { Router } from "express";
import * as userHandler from "./handler.js";

const userEndpoints = Router();

userEndpoints.get("", userHandler.findAllUser);
userEndpoints.post("/auth/register", userHandler.register);
userEndpoints.post("/auth/login", userHandler.login);
userEndpoints.delete("/:userId", userHandler.removeUser);
userEndpoints.put("/:userId", userHandler.updateUser);

export default userEndpoints;
