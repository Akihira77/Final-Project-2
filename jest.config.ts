import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
	preset: "ts-jest/presets/default-esm", // or other ESM presets
	extensionsToTreatAsEsm: [".ts"],
	testMatch: ["<rootDir>/__tests__/*.test.ts"],
	moduleNameMapper: {
		// "^App/(.*)$": "<rootDir>/src/$1"
		"^(\\.{1,2}/.*)\\.js$": "$1"
	},
	transform: {
		// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				useESM: true
			}
		]
	},
	forceExit: true

	// verbose: true
};

export default jestConfig;
