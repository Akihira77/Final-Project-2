import { z } from "zod";
import { isPositiveInteger } from "../../../utils/validateType.js";

export const UserIdParams = z.object({
	// userId: z
	// 	.number({ invalid_type_error: "Invalid User Id" })
	// 	.nonnegative({ message: "Invalid User Id" })
	userId: z
		.string()
		.refine((val) => isPositiveInteger(val), { message: "Invalid User Id" })
});

export type UserIdParamsType = z.infer<typeof UserIdParams>;
