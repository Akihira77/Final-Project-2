import { z } from "zod";

export const CreateCommentRequestDTO = z
	.object({
		comment: z
		.string({ invalid_type_error: "Must be a string" })
		.min(1, { message: "Cannot be empty" }),
		PhotoId: z
		.number({ invalid_type_error: "Must be a number" })
		.max(255, { message: "Value is too long" })
		.min(1, { message: "Cannot be empty" })
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
