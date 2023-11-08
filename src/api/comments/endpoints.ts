import { Router } from "express";
import * as commentHandler from "./handler.js";

const commentEndpoints = Router();

// commentEndpoints.get("", commentHandler.findAllPhoto);
commentEndpoints.post("", commentHandler.addComment);
// commentEndpoints.put("/:commentId", commentHandler.updatePhoto);
// commentEndpoints.delete("/:commentId", commentHandler.removePhoto);

export default commentEndpoints;

