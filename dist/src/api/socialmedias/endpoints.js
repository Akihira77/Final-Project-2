import { Router } from "express";
import * as socialmediaHandler from "./handler.js";
const socialmediaEndpoints = Router();
socialmediaEndpoints.get("", socialmediaHandler.findAllSocialmedia);
socialmediaEndpoints.post("", socialmediaHandler.addSocialmedia);
socialmediaEndpoints.put("/:socialmediaId", socialmediaHandler.updateSocialmedia);
socialmediaEndpoints.delete("/:socialmediaId", socialmediaHandler.removeSocialmedia);
export default socialmediaEndpoints;
//# sourceMappingURL=endpoints.js.map