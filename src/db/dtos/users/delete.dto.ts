import { z } from "zod";

export const DeleteUserDTO = z.object({
	userId: z.string().transform((val) => {
		return parseInt(val);
	})
});

export type DeleteUserDtoType = z.infer<typeof DeleteUserDTO>;
