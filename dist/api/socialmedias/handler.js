import { SocialmediaService } from "../../services/socialmedia.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { CreateSocialmediaRequestDTO, } from "../../db/dtos/socialmedias/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import { EditSocialmediaRequestDTO, } from "../../db/dtos/socialmedias/edit.dto.js";
const socialmediaService = new SocialmediaService();
export const findAllSocialmedia = async (req, res) => {
    try {
        const socialmedias = await socialmediaService.findAll(req.user.userId);
        res.status(StatusCodes.Ok200).send({ socialmedias });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const addSocialmedia = async (req, res) => {
    try {
        const validationResult = validateZodSchema(CreateSocialmediaRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const result = await socialmediaService.add(req.user.userId, req.body);
        res.status(StatusCodes.Created201).send({ ...result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const updateSocialmedia = async (req, res) => {
    try {
        const validationResult = validateZodSchema(EditSocialmediaRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const existedSocialmedia = await socialmediaService.findById(req.params.socialmediaId, req.user.userId);
        if (!existedSocialmedia) {
            throw new CustomAPIError("Socialmedia does not found / You Not Authorized", StatusCodes.NotFound404);
        }
        const result = await socialmediaService.edit(req.user.userId, req.params.socialmediaId, req.body);
        res.status(StatusCodes.Ok200).send({ socialmedia: result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const removeSocialmedia = async (req, res) => {
    try {
        if (!req.params.socialmediaId || req.params.socialmediaId === "") {
            throw new CustomAPIError("SocialmediaId must be provided", StatusCodes.BadRequest400);
        }
        const result = await socialmediaService.delete(req.user.userId, req.params.socialmediaId);
        if (!result) {
            throw new CustomAPIError("Socialmedia does not found / You Not Authorized", StatusCodes.NotFound404);
        }
        res.status(StatusCodes.Ok200).send({
            message: "Your socialmedia has been successfully deleted",
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map