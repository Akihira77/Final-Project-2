export function validateZodSchema(schema, data) {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            errors: validationResult.error.issues.map((issue) => `${issue.path} - ${issue.message}`),
        };
    }
    return { success: true, errors: [] };
}
//# sourceMappingURL=validateZodSchema.js.map