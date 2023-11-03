import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../../utils/constants.js";
import { ValidationError } from "sequelize";
import validationSchema from "../../utils/validation-schema.js";

export const ErrorHandlerMiddleware = async (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ValidationError) {
		res.status(StatusCodes.BadRequest400).send({
			errors: validationSchema(err),
		});
		return;
	}
	res.status(StatusCodes.InternalServerError500).send({ err });
	return;
};

