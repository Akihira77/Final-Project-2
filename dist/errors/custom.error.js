class CustomAPIError extends Error {
    message;
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
export default CustomAPIError;
//# sourceMappingURL=custom.error.js.map