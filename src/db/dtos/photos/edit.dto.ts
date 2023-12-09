import { z } from "zod";

export const EditPhotoRequestDTO = z.object({
	title: z.string().trim(),
	caption: z.string().trim(),
	poster_image_url: z.string().url().trim()
});

export type EditPhotoRequestDtoType = z.infer<typeof EditPhotoRequestDTO>;

export const EditPhotoResponseDTO = z.object({
	id: z.number(),
	poster_image_url: z.string(),
	title: z.string(),
	caption: z.string(),
	UserId: z.number(),
	createdAt: z.date(),
	updatedAt: z.date()
});

export type EditPhotoResponseDtoType = z.infer<typeof EditPhotoResponseDTO>;
