import { Request, Response } from "express";
import { SocialmediaService } from "../../services/socialmedia.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import {
	EditSocialmediaRequestDTO,
	EditSocialmediaRequestDtoType,
	CreateSocialmediaRequestDTO,
	CreateSocialmediaRequestDtoType
} from "../../db/dtos/socialmedias/index.dto.js";

const socialmediaService = new SocialmediaService();

export const findAllSocialmedia = async (req: Request, res: Response) => {
	try {
		const socialmedias = await socialmediaService.findAll(req.user.userId);

		res.status(StatusCodes.Ok200).send({ socialmedias });
		return;
	} catch (error) {
		throw error;
	}
};

export const addSocialmedia = async (
	req: Request<never, never, CreateSocialmediaRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			CreateSocialmediaRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = await socialmediaService.add(req.user.userId, req.body);

		res.status(StatusCodes.Created201).send({ ...result });
		return;
	} catch (error) {
		throw error;
	}
};

export const updateSocialmedia = async (
	req: Request<
		{ socialmediaId: string },
		never,
		EditSocialmediaRequestDtoType,
		never
	>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			EditSocialmediaRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const existedSocialmedia = await socialmediaService.findById(
			req.params.socialmediaId,
			req.user.userId
		);

		if (!existedSocialmedia) {
			throw new CustomAPIError(
				"Socialmedia does not found / You Not Authorized",
				StatusCodes.NotFound404
			);
		}

		const result = await socialmediaService.edit(
			req.user.userId,
			req.params.socialmediaId,
			req.body
		);

		res.status(StatusCodes.Ok200).send({ socialmedia: result });
		return;
	} catch (error) {
		throw error;
	}
};

export const removeSocialmedia = async (
	req: Request<{ socialmediaId: string }, never, never, never>,
	res: Response
) => {
	try {
		if (!req.params.socialmediaId || req.params.socialmediaId === "") {
			throw new CustomAPIError(
				"SocialmediaId must be provided",
				StatusCodes.BadRequest400
			);
		}

		const result = await socialmediaService.delete(
			req.user.userId,
			req.params.socialmediaId
		);
		if (!result) {
			throw new CustomAPIError(
				"Socialmedia does not found / You Not Authorized",
				StatusCodes.NotFound404
			);
		}

		res.status(StatusCodes.Ok200).send({
			message: "Your socialmedia has been successfully deleted"
		});
		return;
	} catch (error) {
		throw error;
	}
};
