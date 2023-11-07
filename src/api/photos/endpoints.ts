import { Router } from "express";
import * as photoHandler from "./handler.js";

const photoEndpoints = Router();

photoEndpoints.get("", photoHandler.findAllPhoto);
photoEndpoints.post("", photoHandler.addPhoto);

export default photoEndpoints;

