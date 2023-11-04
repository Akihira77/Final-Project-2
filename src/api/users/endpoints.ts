import { Router } from "express";
import * as userHandler from "./handler.js";

const userEndpoints = Router();

userEndpoints.get("", userHandler.findAllUser);
userEndpoints.post("", userHandler.register);
userEndpoints.delete("", userHandler.removeUser);

export default userEndpoints;
