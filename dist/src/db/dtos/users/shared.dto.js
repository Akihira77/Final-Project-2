import { z } from "zod";
import { isPositiveInteger } from "../../../utils/validateType.js";
export const UserIdParams = z
    .object({
    userId: z
        .string()
        .refine((val) => isPositiveInteger(val), {
        message: "Invalid User Id"
    })
})
    .strict();
//# sourceMappingURL=shared.dto.js.map