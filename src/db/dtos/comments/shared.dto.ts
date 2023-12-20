import { z } from "zod";
import { isPositiveInteger } from "../../../utils/validateType.js";

export const CommentIdParams = z
	.object({
		commentId: z.string().refine((val) => isPositiveInteger(val), {
			message: "Invalid Comment Id"
		})
	})
	.strict();

export type CommentIdParamsType = z.infer<typeof CommentIdParams>;
