import { z } from "zod";
export const EditCommentRequestDTO = z.object({
    comment: z.string().trim()
});
export const EditCommentResponseDTO = z.object({
    id: z.number(),
    comment: z.string(),
    UserId: z.number(),
    PhotoId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
});
//# sourceMappingURL=edit.dto.js.map