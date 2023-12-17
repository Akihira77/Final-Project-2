import validator from "validator";
import { z } from "zod";

export const EditUserRequestDTO = z
	.object({
		email: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" })
			.email(),
		full_name: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" }),
		username: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" })
			.refine((val) => !validator.contains(val, " "), {
				message: "Cannot contain whitespace"
			}),
		profile_image_url: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" })
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

export type EditUserRequestDtoType = z.infer<typeof EditUserRequestDTO>;

export type EditUserResponseDtoType = {
	user: EditUserRequestDtoType;
};
