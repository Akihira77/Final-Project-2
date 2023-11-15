import { z } from "zod";
export const CreateSocialmediaRequestDTO = z
    .object({
    name: z.string().trim(),
    social_media_url: z.string().trim(),
})
    .strict();
export const CreateSocialmediaResponseDTO = z
    .object({
    id: z.number(),
    name: z.string(),
    social_media_url: z.string(),
    UserId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})
    .strict();
//# sourceMappingURL=create.dto.js.map