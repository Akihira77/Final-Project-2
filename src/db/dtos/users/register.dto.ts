import { z } from "zod";

export const RegisterRequestDTO = z.object({
	email: z.string().email(),
	full_name: z.string(),
	username: z.string(),
	password: z.string(),
	profile_image_url: z.string().url(),
	age: z.number(),
	phone_number: z.string(),
});

export type RegisterRequestDtoType = z.infer<typeof RegisterRequestDTO>;

export interface RegisterResponseDtoType
	extends Omit<RegisterRequestDtoType, "password"> {}
