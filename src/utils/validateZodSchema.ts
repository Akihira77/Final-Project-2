import { z } from "zod";

type ValidationResult = {
	success: boolean;
	errors: string[];
};

export function validateZodSchema(
	schema: z.Schema,
	data: unknown
): ValidationResult {
	const validationResult = schema.safeParse(data);

	if (!validationResult.success) {
		return {
			success: false,
			errors: validationResult.error.issues.map(
				(issue) => `${issue.path} - ${issue.message}`
			),
		};
	}

	return { success: true, errors: [] };
}

