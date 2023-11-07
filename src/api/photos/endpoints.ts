import { Router } from "express";
import * as photoHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const photoEndpoints = Router();

photoEndpoints.get("", photoHandler.findAllPhoto);
photoEndpoints.post("", authMiddleware, photoHandler.addPhoto);

export default photoEndpoints;

