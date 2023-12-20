import { StatusCodes } from "../utils/constants.js";
class ZodSchemaError {
    errors;
    name;
    statusCode;
    constructor(errors) {
        this.errors = errors;
        this.name = "Schema validation";
        this.statusCode = StatusCodes.BadRequest400;
    }
}
export default ZodSchemaError;
//# sourceMappingURL=zod-schema.error.js.map