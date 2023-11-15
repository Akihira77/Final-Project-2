import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

type AuthPayload = {
	userId: string;
	email: string;
	full_name: string;
};

export function jwtSign(payload: AuthPayload) {
	const token = jwt.sign({ user: payload }, JWT_SECRET!);

	return token;
}

export function jwtVerify(token: string) {
	const payload = <jwt.JwtPayload>jwt.verify(token, JWT_SECRET!);

	return payload;
}
