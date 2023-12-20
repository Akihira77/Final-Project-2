import { z } from "zod";
import { isPositiveInteger } from "../../../utils/validateType.js";
export const SocialMediaIdParams = z
    .object({
    socialmediaId: z.string().refine((val) => isPositiveInteger(val), {
        message: "Invalid SocialmediaId"
    })
})
    .strict();
//# sourceMappingURL=shared.dto.js.map