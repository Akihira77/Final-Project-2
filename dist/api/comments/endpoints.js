import { Router } from "express";
import * as commentHandler from "./handler.js";
const commentEndpoints = Router();
commentEndpoints.post("", commentHandler.addComment);
export default commentEndpoints;
//# sourceMappingURL=endpoints.js.map