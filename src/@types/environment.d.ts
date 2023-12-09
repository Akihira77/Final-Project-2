export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			JWT_SECRET: string;
			POSTGRESS: string;
			NODE_ENV: string;
			DB_POSTGRES: string;
		}
	}
}
