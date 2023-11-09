import { z } from "zod";
export const EditSocialmediaRequestDTO = z.object({
    name: z.string().trim(),
    social_media_url: z.string().trim(),
});
export const EditSocialmediaResponseDTO = z.object({
    id: z.number(),
    name: z.string(),
    social_media_url: z.string(),
    UserId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
//# sourceMappingURL=edit.dto.js.map