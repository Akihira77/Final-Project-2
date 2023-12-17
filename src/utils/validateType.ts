export const isNumeric = (num: unknown) =>
	(typeof num === "number" ||
		(typeof num === "string" && num.trim() !== "")) &&
	!isNaN(Number(num));

export const isPositiveInteger = (value: unknown) => {
	const num = Math.floor(Number(value));
	return num !== Infinity && String(num) === value && num >= 0;
};
