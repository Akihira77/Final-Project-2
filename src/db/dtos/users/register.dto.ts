import { z } from "zod";

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
			.min(1, { message: "Cannot be empty" }),
		password: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" }),
		profile_image_url: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.url(),
		age: z
			.number({ invalid_type_error: "Must be a number" })
			.min(1, { message: "Must be a positive number" }),
		phone_number: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
	})
	.strict();

export type RegisterRequestDtoType = z.infer<typeof RegisterRequestDTO>;

export type RegisterResponseDtoType = Omit<RegisterRequestDtoType, "password">;
