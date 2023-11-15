import { z } from "zod";
export const EditUserRequestDTO = z
    .object({
    email: z.string().email(),
    full_name: z.string(),
    username: z.string(),
    profile_image_url: z.string().url(),
    age: z.number(),
    phone_number: z.string(),
})
    .strict();
//# sourceMappingURL=edit.dto.js.map