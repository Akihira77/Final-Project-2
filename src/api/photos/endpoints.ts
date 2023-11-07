import { Router } from "express";
import * as photoHandler from "./handler.js";

const photoEndpoints = Router();

photoEndpoints.get("", photoHandler.findAllPhoto);
photoEndpoints.post("", photoHandler.addPhoto);
photoEndpoints.delete("/:photoId", photoHandler.removePhoto);

export default photoEndpoints;

