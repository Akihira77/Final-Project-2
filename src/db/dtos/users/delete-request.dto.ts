import { z } from "zod";

export const DeleteUserDTO = z.object({
	userId: z.string(),
});

export type DeleteUserDtoType = z.infer<typeof DeleteUserDTO>;

