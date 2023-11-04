import { z } from "zod";

export const LoginRequestDTO = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginRequestDtoType = z.infer<typeof LoginRequestDTO>;

