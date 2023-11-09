import { Router } from "express";
import * as commentHandler from "./handler.js";
const commentEndpoints = Router();
commentEndpoints.get("", commentHandler.findAllComment);
commentEndpoints.post("", commentHandler.addComment);
commentEndpoints.put("/:commentId", commentHandler.updateComment);
commentEndpoints.delete("/:commentId", commentHandler.removeComment);
export default commentEndpoints;
//# sourceMappingURL=endpoints.js.map