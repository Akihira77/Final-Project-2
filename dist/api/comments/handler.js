import { CommentService } from "../../services/comment.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { CreateCommentRequestDTO, } from "../../db/dtos/comments/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { ZodSchemaError } from "../../errors/main.error.js";
const commentService = new CommentService();
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
//# sourceMappingURL=handler.js.map