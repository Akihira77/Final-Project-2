export function validateZodSchema(schema, data) {
    const validationResult = schema.safeParse(data);
    let errors = {};
    if (!validationResult.success) {
        for (const { path, message } of validationResult.error.issues) {
            const key = String(path[0]);
            if (key in errors) {
                errors[key].push(message);
            }
            else {
                errors[key] = [message];
            }
        }
    }
    return { success: validationResult.success, errors };
}
//# sourceMappingURL=validateZodSchema.js.map