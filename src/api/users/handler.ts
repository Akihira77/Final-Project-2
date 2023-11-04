import { Request, Response } from "express";
import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { RegisterRequestDTO } from "../../db/dtos/users/register-request.dto.js";
import { DeleteUserDTO } from "../../db/dtos/users/delete-request.dto.js";
import CustomAPIError from "../../errors/custom.error.js";

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
	req: Request<never, never, RegisterRequestDTO, never>,
	res: Response
) => {
	try {
		const result = await userService.add(req.body);

		res.status(StatusCodes.Created201).send({ user: result });
		return;
	} catch (error) {
		throw error;
	}
};

export const removeUser = async (
	req: Request<DeleteUserDTO, never, never, never>,
	res: Response
) => {
	try {
		const result = await userService.delete(req.params.userId);

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
