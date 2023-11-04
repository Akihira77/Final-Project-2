import { RegisterRequestDtoType } from "./register-request.dto.js";

export interface RegisterResponseDtoType
	extends Omit<RegisterRequestDtoType, "password"> {}
