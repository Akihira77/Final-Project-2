import { z } from "zod";

export const LoginRequestDTO = z
	.object({
		email: z.string().min(1, { message: "Cannot be empty" }).email(),
		password: z.string().min(1, { message: "Cannot be empty" })
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
