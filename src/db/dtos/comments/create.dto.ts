import { z } from "zod";

export const CreateCommentRequestDTO = z
	.object({
		comment: z.string().trim(),
		PhotoId: z.number()
	})
	.strict();

export type CreateCommentRequestDtoType = z.infer<
	typeof CreateCommentRequestDTO
>;

export const CreateCommentResponseDTO = z
	.object({
		id: z.number(),
		comment: z.string(),
		PhotoId: z.number(),
		UserId: z.number(),
		createdAt: z.date(),
		updatedAt: z.date()
	})
	.strict();

export type CreateCommentResponseDtoType = z.infer<
	typeof CreateCommentResponseDTO
>;
