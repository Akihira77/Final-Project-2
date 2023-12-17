import { Request, Response } from "express";
import { PhotoService } from "../../services/photo.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import {
	EditPhotoRequestDTO,
	EditPhotoRequestDtoType,
	CreatePhotoRequestDTO,
	CreatePhotoRequestDtoType,
	PhotoIdParamsType,
	PhotoIdParams
} from "../../db/dtos/photos/index.dto.js";

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

export const updatePhoto = async (
	req: Request<PhotoIdParamsType, never, EditPhotoRequestDtoType, never>,
	res: Response
) => {
	try {
		let validationResult = validateZodSchema(PhotoIdParams, req.params);
		if (validationResult.success) {
			validationResult = validateZodSchema(EditPhotoRequestDTO, req.body);
		}

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const photoId = parseInt(req.params.photoId.toString());
		const existedPhoto = await photoService.findByUserIdAndPhotoId(
			photoId,
			req.user.userId
		);

		if (!existedPhoto) {
			throw new CustomAPIError(
				"Photo does not found",
				StatusCodes.NotFound404
			);
		}

		const result = await photoService.edit(photoId, req.body);

		res.status(StatusCodes.Ok200).send({ photo: result });
		return;
	} catch (error) {
		throw error;
	}
};

export const removePhoto = async (
	req: Request<PhotoIdParamsType, never, never, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(PhotoIdParams, req.params);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const photoId = parseInt(req.params.photoId.toString());
		const existedPhoto = await photoService.findByUserIdAndPhotoId(
			photoId,
			req.user.userId
		);

		if (!existedPhoto) {
			throw new CustomAPIError(
				"Photo does not found",
				StatusCodes.NotFound404
			);
		}

		await photoService.delete(photoId);

		res.status(StatusCodes.Ok200).send({
			message: "Your photo has been successfully deleted"
		});
		return;
	} catch (error) {
		throw error;
	}
};
