import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { EditUserRequestDTO, LoginRequestDTO, RegisterRequestDTO, UserIdParams } from "../../db/dtos/users/index.dto.js";
const userService = new UserService();
export const findAllUser = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.status(StatusCodes.Ok200).send({ users });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const register = async (req, res) => {
    try {
        const validationResult = validateZodSchema(RegisterRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const result = await userService.add(req.body);
        res.status(StatusCodes.Created201).send({ user: result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const login = async (req, res) => {
    try {
        const validationResult = validateZodSchema(LoginRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const user = await userService.findByEmail(req.body.email);
        if (!user) {
            throw new CustomAPIError("User not found", StatusCodes.NotFound404);
        }
        const result = await userService.login(user, req.body);
        if (typeof result === "string") {
            throw new CustomAPIError(result, StatusCodes.BadRequest400);
        }
        res.status(StatusCodes.Ok200).send({ token: result.token });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const removeUser = async (req, res) => {
    try {
        const validationResult = validateZodSchema(UserIdParams, req.params);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const userId = parseInt(req.params.userId.toString());
        const userIdFromPayload = req.user.userId;
        if (userId !== userIdFromPayload) {
            throw new CustomAPIError("Invalid Credentials", StatusCodes.Forbidden403);
        }
        const result = await userService.delete(userId);
        if (!result) {
            throw new CustomAPIError("User does not found", StatusCodes.NotFound404);
        }
        res.status(StatusCodes.Ok200).send({
            message: "Your account has been successfully deleted"
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const updateUser = async (req, res) => {
    try {
        let validationResult = validateZodSchema(UserIdParams, req.params);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const userIdFromPayload = req.user.userId;
        const userIdParams = parseInt(req.params.userId.toString());
        if (userIdParams !== userIdFromPayload) {
            throw new CustomAPIError("Invalid Credentials", StatusCodes.Forbidden403);
        }
        validationResult = validateZodSchema(EditUserRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const result = await userService.edit(userIdParams, req.body);
        res.status(StatusCodes.Ok200).send({ user: result.user });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map