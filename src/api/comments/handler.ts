import { Request, Response } from "express";
import { CommentService } from "../../services/comment.service.js";
import { StatusCodes } from "../../utils/constants.js";
import {
	CreateCommentRequestDTO,
	CreateCommentRequestDtoType,
} from "../../db/dtos/comments/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
// import {
// 	EditCommentRequestDTO,
// 	EditCommentRequestDtoType,
// } from "../../db/dtos/photos/edit.dto.js";

const commentService = new CommentService();

// export const findAllPhoto = async (req: Request, res: Response) => {
// 	try {
// 		const photos = await photoService.findAll();

// 		res.status(StatusCodes.Ok200).send({ photos });
// 		return;
// 	} catch (error) {
// 		throw error;
// 	}
// };

export const addComment = async (
	req: Request<never, never, CreateCommentRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			CreateCommentRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = await commentService.add(req.user.userId, req.body);

		res.status(StatusCodes.Created201).send({ ...result });
		return;
	} catch (error) {
		throw error;
	}
};

// export const updatePhoto = async (
// 	req: Request<{ photoId: string }, never, EditPhotoRequestDtoType, never>,
// 	res: Response
// ) => {
// 	try {
// 		const validationResult = validateZodSchema(
// 			EditPhotoRequestDTO,
// 			req.body
// 		);
// 		if (!validationResult.success) {
// 			throw new ZodSchemaError(validationResult.errors);
// 		}

// 		const existedPhoto = await photoService.findById(req.params.photoId);

// 		if (!existedPhoto) {
// 			throw new CustomAPIError(
// 				"Photo does not found",
// 				StatusCodes.NotFound404
// 			);
// 		}

// 		const result = await photoService.edit(req.params.photoId, req.body);

// 		res.status(StatusCodes.Ok200).send({ photo: result });
// 		return;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export const removePhoto = async (
// 	req: Request<{ photoId: string }, never, never, never>,
// 	res: Response
// ) => {
// 	try {
// 		if (!req.params.photoId || req.params.photoId === "") {
// 			throw new CustomAPIError(
// 				"PhotoId must be provided",
// 				StatusCodes.BadRequest400
// 			);
// 		}

// 		const result = await photoService.delete(req.params.photoId);
// 		if (!result) {
// 			throw new CustomAPIError(
// 				"Photo does not found",
// 				StatusCodes.NotFound404
// 			);
// 		}

// 		res.status(StatusCodes.Ok200).send({
// 			message: "Your photo has been successfully deleted",
// 		});
// 		return;
// 	} catch (error) {
// 		throw error;
// 	}
// };
