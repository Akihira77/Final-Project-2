export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			JWT_SECRET: string;
			POSTGRESS: string;
			NODE_ENV: string;
			// dev
			DB_USERNAME_DEV: string;
			DB_PASSWORD_DEV: string;
			DB_NAME_DEV: string;
			DB_HOST_DEV: number;
			DB_DIALECT_DEV: string;

			// test
			DB_USERNAME_TEST: string;
			DB_PASSWORD_TEST: string;
			DB_NAME_TEST: string;
			DB_HOST_TEST: number;
			DB_DIALECT_TEST: string;

			// production
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_NAME: string;
			DB_HOST: number;
			DB_DIALECT: string;
		}
	}
}
