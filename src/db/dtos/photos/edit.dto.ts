import { z } from "zod";

export const EditPhotoRequestDTO = z
	.object({
		title: z
			.string({ invalid_type_error: "Must be a string" })
			.max(255, { message: "Value is too long" }),
		caption: z
			.string({ invalid_type_error: "Must be a string" })
			.max(255, { message: "Value is too long" }),
		poster_image_url: z
			.string({ invalid_type_error: "Must be a string" })
			.max(255, { message: "Value is too long" })
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
