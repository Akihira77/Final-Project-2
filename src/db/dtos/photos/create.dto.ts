import { z } from "zod";

export const CreatePhotoRequestDTO = z
	.object({
		poster_image_url: z.string().url().trim(),
		title: z.string().trim(),
		caption: z.string().trim()
	})
	.strict();

export type CreatePhotoRequestDtoType = z.infer<typeof CreatePhotoRequestDTO>;

export const CreatePhotoResponseDTO = z
	.object({
		id: z.number(),
		poster_image_url: z.string(),
		title: z.string(),
		caption: z.string(),
		UserId: z.number()
	})
	.strict();

export type CreatePhotoResponseDtoType = z.infer<typeof CreatePhotoResponseDTO>;
