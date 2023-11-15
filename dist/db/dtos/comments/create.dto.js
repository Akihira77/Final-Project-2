import { z } from "zod";
export const CreateCommentRequestDTO = z
    .object({
    comment: z.string().trim(),
    PhotoId: z.number(),
})
    .strict();
export const CreateCommentResponseDTO = z
    .object({
    id: z.number(),
    comment: z.string(),
    PhotoId: z.number(),
    UserId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})
    .strict();
//# sourceMappingURL=create.dto.js.map