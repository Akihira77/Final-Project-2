import { z } from "zod";
export const EditPhotoRequestDTO = z.object({
    title: z.string().trim(),
    caption: z.string().trim(),
    poster_image_url: z.string().url().trim(),
});
export const EditPhotoResponseDTO = z.object({
    id: z.number(),
    poster_image_url: z.string(),
    title: z.string(),
    caption: z.string(),
    UserId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
//# sourceMappingURL=edit.dto.js.map