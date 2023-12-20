import { z } from "zod";
import { isPositiveInteger } from "../../../utils/validateType.js";
export const PhotoIdParams = z
    .object({
    photoId: z.string().refine((val) => isPositiveInteger(val), {
        message: "Invalid Photo Id"
    })
})
    .strict();
//# sourceMappingURL=shared.dto.js.map