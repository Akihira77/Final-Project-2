class CustomAPIError extends Error {
	constructor(readonly message: string, private readonly statusCode: number) {
		super(message);
	}
}

export default CustomAPIError;

