import { z } from "zod";

export const EditCommentRequestDTO = z.object({
	comment: z.string().trim()
});

export type EditCommentRequestDtoType = z.infer<typeof EditCommentRequestDTO>;

export const EditCommentResponseDTO = z.object({
	id: z.number(),
	comment: z.string(),
	UserId: z.number(),
	PhotoId: z.number(),
	createdAt: z.date(),
	updatedAt: z.date()
});

export type EditCommentResponseDtoType = z.infer<typeof EditCommentResponseDTO>;
