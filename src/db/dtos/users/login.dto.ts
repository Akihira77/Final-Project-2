import { z } from "zod";

export const LoginRequestDTO = z
	.object({
		email: z.string().email(),
		password: z.string(),
	})
	.strict();

export type LoginRequestDtoType = z.infer<typeof LoginRequestDTO>;

export const LoginResponseDTO = z.union([
	z.string(),
	z.object({
		token: z.string(),
	}),
]);

export type LoginResponseDtoType = z.infer<typeof LoginResponseDTO>;

