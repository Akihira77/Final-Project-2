import validator from "validator";
import { z } from "zod";

export const LoginRequestDTO = z
	.object({
		email: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" })
			.email(),
		password: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" })
			.refine((val) => !validator.contains(val, " "), {
				message: "Cannot contain whitespace"
			})
	})
	.strict();

export type LoginRequestDtoType = z.infer<typeof LoginRequestDTO>;

export const LoginResponseDTO = z.union([
	z.string(),
	z.object({
		token: z.string()
	})
]);

export type LoginResponseDtoType = z.infer<typeof LoginResponseDTO>;
