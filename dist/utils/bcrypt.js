import bcrypt from "bcrypt";
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
export async function validate(requestPassword, actualPassword) {
    return await bcrypt.compare(requestPassword, actualPassword);
}
//# sourceMappingURL=bcrypt.js.map