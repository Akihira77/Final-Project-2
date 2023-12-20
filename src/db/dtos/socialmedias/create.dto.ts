import { z } from "zod";

export const CreateSocialmediaRequestDTO = z
	.object({
		name: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" }),
		social_media_url: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.max(255, { message: "Value is too long" })
			.url(),
	})
	.strict();

export type CreateSocialmediaRequestDtoType = z.infer<
	typeof CreateSocialmediaRequestDTO
>;

export const CreateSocialmediaResponseDTO = z
	.object({
		id: z.number(),
		name: z.string(),
		social_media_url: z.string(),
		UserId: z.number(),
		createdAt: z.date(),
		updatedAt: z.date()
	})
	.strict();

export type CreateSocialmediaResponseDtoType = z.infer<
	typeof CreateSocialmediaResponseDTO
>;
