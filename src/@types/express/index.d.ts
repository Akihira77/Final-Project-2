import { Request } from "express";
import { AuthPayload } from "../shared.js";

declare global {
	namespace Express {
		export interface Request extends Request {
			user: AuthPayload;
		}
	}
}

