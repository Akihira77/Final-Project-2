import { CommentService } from "../../services/comment.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { CreateCommentRequestDTO, } from "../../db/dtos/comments/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import { EditCommentRequestDTO, } from "../../db/dtos/comments/edit.dto.js";
const commentService = new CommentService();
export const findAllComment = async (req, res) => {
    try {
        const comments = await commentService.findAll(req.user.userId);
        res.status(StatusCodes.Ok200).send({ comments });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const addComment = async (req, res) => {
    try {
        const validationResult = validateZodSchema(CreateCommentRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const result = await commentService.add(req.user.userId, req.body);
        res.status(StatusCodes.Created201).send({ ...result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const updateComment = async (req, res) => {
    try {
        const validationResult = validateZodSchema(EditCommentRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const existedComment = await commentService.findById(req.params.commentId, req.user.userId);
        if (!existedComment) {
            throw new CustomAPIError("Comment does not found / You Not Authorized", StatusCodes.NotFound404);
        }
        const result = await commentService.edit(req.user.userId, req.params.commentId, req.body);
        res.status(StatusCodes.Ok200).send({ comment: result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const removeComment = async (req, res) => {
    try {
        if (!req.params.commentId || req.params.commentId === "") {
            throw new CustomAPIError("CommentId must be provided", StatusCodes.BadRequest400);
        }
        const result = await commentService.delete(req.user.userId, req.params.commentId);
        if (!result) {
            throw new CustomAPIError("Comment does not found / You Not Authorized", StatusCodes.NotFound404);
        }
        res.status(StatusCodes.Ok200).send({
            message: "Your comment has been successfully deleted",
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map