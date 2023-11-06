import { Request, Response } from "express";
import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";
import {
	RegisterRequestDTO,
	RegisterRequestDtoType,
} from "../../db/dtos/users/register.dto.js";
import {
	DeleteUserDTO,
	DeleteUserDtoType,
} from "../../db/dtos/users/delete.dto.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import {
	LoginRequestDTO,
	LoginRequestDtoType,
} from "../../db/dtos/users/login.dto.js";
import {
	EditUserRequestDTO,
	EditUserRequestDtoType,
} from "../../db/dtos/users/edit.dto.js";

const userService = new UserService();

export const findAllUser = async (req: Request, res: Response) => {
	try {
		const users = await userService.findAll();

		res.status(StatusCodes.Ok200).send({ users });
		return;
	} catch (error) {
		throw error;
	}
};

export const register = async (
	req: Request<never, never, RegisterRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			RegisterRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = await userService.add(req.body);

		res.status(StatusCodes.Created201).send({ user: result });
		return;
	} catch (error) {
		throw error;
	}
};

export const login = async (
	req: Request<never, never, LoginRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(LoginRequestDTO, req.body);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = await userService.login(req.body);

		if (typeof result === "string") {
			throw new CustomAPIError(result, StatusCodes.BadRequest400);
		}

		res.status(StatusCodes.Ok200).send({ token: result.token });
		return;
	} catch (error) {
		throw error;
	}
};

export const removeUser = async (
	req: Request<DeleteUserDtoType, never, never, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(DeleteUserDTO, req.params);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const { userId } = req.params;
		const userIdFromPayload = req.user.userId;

		if (userId !== userIdFromPayload) {
			throw new CustomAPIError(
				"Invalid Credentials",
				StatusCodes.Forbidden403
			);
		}

		const result = await userService.delete({ userId });

		if (!result) {
			throw new CustomAPIError(
				"User does not found",
				StatusCodes.NotFound404
			);
		}

		res.status(StatusCodes.Ok200).send({
			message: "Your account has been successfully deleted",
		});
		return;
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (
	req: Request<{ userId: string }, never, EditUserRequestDtoType, never>,
	res: Response
) => {
	try {
		if (!req.params.userId || req.params.userId === "") {
			throw new CustomAPIError(
				"User Id must be provided",
				StatusCodes.BadRequest400
			);
		}

		const validationResult = validateZodSchema(
			EditUserRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const existedUser = await userService.findById(req.params.userId);
		if (!existedUser) {
			throw new CustomAPIError(
				"User does not found",
				StatusCodes.BadRequest400
			);
		}

		const userIdFromPayload = req.user.userId;
		if (req.params.userId !== userIdFromPayload) {
			throw new CustomAPIError(
				"Invalid Credentials",
				StatusCodes.Forbidden403
			);
		}

		const result = await userService.edit(req.params.userId, req.body);

		res.status(StatusCodes.Ok200).send({ user: result.user });
		return;
	} catch (error) {
		throw error;
	}
};
