import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../../utils/constants.js";
import { ValidationError } from "sequelize";
import validationSchema from "../../utils/validation-schema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/main.error.js";

export const ErrorHandlerMiddleware = async (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("Catching error from error handler middleware => ", err);
	if (err instanceof ValidationError) {
		res.status(StatusCodes.BadRequest400).send({
			errors: validationSchema(err)
		});
	} else if (err instanceof ZodSchemaError) {
		res.status(err.statusCode).send({ name: err.name, errors: err.errors });
	} else if (err instanceof CustomAPIError) {
		res.status(err.statusCode).send({ message: err.message });
	} else {
		res.status(StatusCodes.InternalServerError500).send({ err });
	}
	return;
};
