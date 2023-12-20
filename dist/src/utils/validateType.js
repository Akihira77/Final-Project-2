export const isNumeric = (num) => (typeof num === "number" ||
    (typeof num === "string" && num.trim() !== "")) &&
    !isNaN(Number(num));
export const isPositiveInteger = (value) => {
    const num = Math.floor(Number(value));
    return num !== Infinity && String(num) === value && num >= 0;
};
//# sourceMappingURL=validateType.js.map