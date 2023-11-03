import { Router } from "express";
import * as userHandler from "./handler.js";

const userEndpoints = Router();

userEndpoints.get("", userHandler.findAll);
userEndpoints.post("", userHandler.register);

export default userEndpoints;

