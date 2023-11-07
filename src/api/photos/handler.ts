import { Request, Response } from "express";
import { PhotoService } from "../../services/photo.service.js";
import { StatusCodes } from "../../utils/constants.js";
import {
	CreatePhotoRequestDTO,
	CreatePhotoRequestDtoType,
} from "../../db/dtos/photos/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { ZodSchemaError } from "../../errors/main.error.js";

const photoService = new PhotoService();

export const findAllPhoto = async (req: Request, res: Response) => {
	try {
		const photos = await photoService.findAll();

		res.status(StatusCodes.Ok200).send({ photos });
		return;
	} catch (error) {
		throw error;
	}
};

export const addPhoto = async (
	req: Request<never, never, CreatePhotoRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			CreatePhotoRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = await photoService.add(req.user.userId, req.body);

		res.status(StatusCodes.Created201).send({ ...result });
		return;
	} catch (error) {
		throw error;
	}
};

