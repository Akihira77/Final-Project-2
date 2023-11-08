import { PhotoService } from "../../services/photo.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { CreatePhotoRequestDTO, } from "../../db/dtos/photos/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import { EditPhotoRequestDTO, } from "../../db/dtos/photos/edit.dto.js";
const photoService = new PhotoService();
export const findAllPhoto = async (req, res) => {
    try {
        const photos = await photoService.findAll();
        res.status(StatusCodes.Ok200).send({ photos });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const addPhoto = async (req, res) => {
    try {
        const validationResult = validateZodSchema(CreatePhotoRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const result = await photoService.add(req.user.userId, req.body);
        res.status(StatusCodes.Created201).send({ ...result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const updatePhoto = async (req, res) => {
    try {
        const validationResult = validateZodSchema(EditPhotoRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const existedPhoto = await photoService.findById(req.params.photoId);
        if (!existedPhoto) {
            throw new CustomAPIError("Photo does not found", StatusCodes.NotFound404);
        }
        const result = await photoService.edit(req.params.photoId, req.body);
        res.status(StatusCodes.Ok200).send({ photo: result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const removePhoto = async (req, res) => {
    try {
        if (!req.params.photoId || req.params.photoId === "") {
            throw new CustomAPIError("PhotoId must be provided", StatusCodes.BadRequest400);
        }
        const result = await photoService.delete(req.params.photoId);
        if (!result) {
            throw new CustomAPIError("Photo does not found", StatusCodes.NotFound404);
        }
        res.status(StatusCodes.Ok200).send({
            message: "Your photo has been successfully deleted",
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map