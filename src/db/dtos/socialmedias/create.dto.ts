import { z } from "zod";

export const CreateSocialmediaRequestDTO = z
	.object({
		name: z.string().trim(),
		social_media_url: z.string().trim()
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
