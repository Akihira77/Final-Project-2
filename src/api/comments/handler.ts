import { Request, Response } from "express";
import { CommentService } from "../../services/comment.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import {
	EditCommentRequestDTO,
	EditCommentRequestDtoType,
	CreateCommentRequestDTO,
	CreateCommentRequestDtoType,
	CommentIdParamsType,
	CommentIdParams
} from "../../db/dtos/comments/index.dto.js";

const commentService = new CommentService();

export const findAllComment = async (req: Request, res: Response) => {
	try {
		const comments = await commentService.findAll(req.user.userId);

		res.status(StatusCodes.Ok200).send({ comments });
		return;
	} catch (error) {
		throw error;
	}
};

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

export const updateComment = async (
	req: Request<CommentIdParamsType,never,EditCommentRequestDtoType,never>,
	res: Response
) => {
	try {
		let validationResult = validateZodSchema(CommentIdParams, req.params);
		if (validationResult.success) {
			validationResult = validateZodSchema(EditCommentRequestDTO, req.body);
		}

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const commentId = parseInt(req.params.commentId.toString());
		const existedComment = await commentService.findById(
			commentId,
			req.user.userId
		);

		if (!existedComment) {
			throw new CustomAPIError(
				"Comment does not found",
				StatusCodes.NotFound404
			);
		}

		const result = await commentService.edit(
			req.user.userId,
			commentId,
			req.body);

		res.status(StatusCodes.Ok200).send({ comment: result });
		return;
	} catch (error) {
		throw error;
	}
};

export const removeComment = async (
	req: Request<{ commentId: string }, never, never, never>,
	res: Response
) => {
	try {
		if (!req.params.commentId || req.params.commentId === "") {
			throw new CustomAPIError(
				"CommentId must be provided",
				StatusCodes.BadRequest400
			);
		}

		const result = await commentService.delete(
			req.user.userId,
			req.params.commentId
		);
		if (!result) {
			throw new CustomAPIError(
				"Comment does not found / You Not Authorized",
				StatusCodes.NotFound404
			);
		}

		res.status(StatusCodes.Ok200).send({
			message: "Your comment has been successfully deleted"
		});
		return;
	} catch (error) {
		throw error;
	}
};
