import { z } from "zod";
import validator from "validator";

export const RegisterRequestDTO = z
	.object({
		email: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.email(),
		full_name: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" }),
		username: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.refine((val) => !validator.contains(val, " "), {
				message: "Cannot contain whitespace"
			}),
		password: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.refine((val) => !validator.contains(val, " "), {
				message: "Cannot contain whitespace"
			}),
		profile_image_url: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.url(),
		age: z
			.number({ invalid_type_error: "Must be a number" })
			.min(1, { message: "Must be a positive number" })
			.max(1000, { message: "The number is too large" }),
		phone_number: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.refine((val) => validator.isMobilePhone(val, "id-ID"), {
				message: "Invalid phone number"
			})
	})
	.strict();

export type RegisterRequestDtoType = z.infer<typeof RegisterRequestDTO>;

export type RegisterResponseDtoType = Omit<RegisterRequestDtoType, "password">;
