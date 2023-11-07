import { Router } from "express";
import * as photoHandler from "./handler.js";
const photoEndpoints = Router();
photoEndpoints.get("", photoHandler.findAllPhoto);
export default photoEndpoints;
//# sourceMappingURL=endpoints.js.map