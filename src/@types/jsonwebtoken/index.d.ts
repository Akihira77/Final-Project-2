import jwt from "jsonwebtoken";
import { AuthPayload } from "../shared.js";

declare module "jsonwebtoken" {
	interface JwtPayload {
		user: AuthPayload;
	}
}

export {};

