import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
export function jwtSign(payload) {
    const token = jwt.sign({ user: payload }, JWT_SECRET);
    return token;
}
export function jwtVerify(token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
}
//# sourceMappingURL=jwt.js.map