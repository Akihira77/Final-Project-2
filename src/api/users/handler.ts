import { Request, Response, Router } from "express";
import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { RegisterRequestDTO } from "../../db/dtos/users/register-request.dto.js";

const userService = new UserService();

export const findAll = async (req: Request, res: Response) => {
	try {
		const users = await userService.findAll();

		res.status(StatusCodes.Ok200).send({ users });
		return;
	} catch (error) {
		console.log(error);
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
		console.log(error);
		throw error;
	}
};

