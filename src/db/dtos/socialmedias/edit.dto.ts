import { z } from "zod";

export const EditSocialmediaRequestDTO = z.object({
	name: z.string().trim(),
	social_media_url: z.string().trim(),
});

export type EditSocialmediaRequestDtoType = z.infer<typeof EditSocialmediaRequestDTO>;

export const EditSocialmediaResponseDTO = z.object({
	id: z.number(),
    name: z.string(),
    social_media_url: z.string(),
    UserId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type EditSocialmediaResponseDtoType = z.infer<typeof EditSocialmediaResponseDTO>;

