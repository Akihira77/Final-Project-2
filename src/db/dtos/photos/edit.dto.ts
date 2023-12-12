import { z } from "zod";

export const EditPhotoRequestDTO = z
	.object({
		title: z.string({ invalid_type_error: "Must be a string" }),
		caption: z.string({ invalid_type_error: "Must be a string" }),
		poster_image_url: z
			.string({ invalid_type_error: "Must be a string" })
			.url()
	})
	.strict();

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
