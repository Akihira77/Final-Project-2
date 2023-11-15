import { z } from "zod";
export const LoginRequestDTO = z
    .object({
    email: z.string().email(),
    password: z.string(),
})
    .strict();
export const LoginResponseDTO = z.union([
    z.string(),
    z.object({
        token: z.string(),
    }),
]);
//# sourceMappingURL=login.dto.js.map