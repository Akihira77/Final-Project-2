import { z } from "zod";

export const CreatePhotoRequestDTO = z
	.object({
		poster_image_url: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
			.url(),
		title: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" }),
		caption: z
			.string({ invalid_type_error: "Must be a string" })
			.min(1, { message: "Cannot be empty" })
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
