import { StatusCodes } from "../utils/constants.js";

class ZodSchemaError {
	readonly name: string;
	readonly statusCode: number;
	constructor(readonly errors: Record<string, string[]>) {
		this.name = "Schema validation";
		this.statusCode = StatusCodes.BadRequest400;
	}
}

export default ZodSchemaError;
