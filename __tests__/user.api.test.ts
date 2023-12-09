import { afterAll, beforeAll, describe, expect, it, test } from "@jest/globals";
import { startServer } from "../src/server.js";
import { sequelize } from "../src/db/db.js";
import supertest from "supertest";

const server = startServer();

// describe("USER ENDPOINTS", () => {
beforeAll(async () => {
	await sequelize.sync({ force: true });
});

afterAll(async () => {
	await sequelize.sync({ force: true });
});
let registerRequest = {
	email: "test@example.com",
	full_name: "user test",
	username: "test123",
	password: "test123",
	profile_image_url: "http://img-example.com",
	age: 10,
	phone_number: "082380539019"
};
describe("POST api/users/register", () => {
	const registerUrl = "/api/users/register";

	it("1. Error 400 - Null Request Body", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(undefined);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
	});

	it("2. Error 400 - Invalid Email", async () => {
		const invalidEmailRequest = {
			...registerRequest,
			email: "test"
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidEmailRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email");
	});

	it("3. Error 400 - Invalid Profile Image Url", async () => {
		const invalidImageUrlRequest = {
			...registerRequest,
			profile_image_url: "test"
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidImageUrlRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("profile_image_url");
	});

	it("4. Error 400 - Invalid Age", async () => {
		const invalidAgeRequest = {
			...registerRequest,
			age: "20"
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidAgeRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("age");
	});

	it("5. Success 201 - Registration Success", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(registerRequest);

		expect(statusCode).toBe(201);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("6. Error 400 - Duplicate User Email/Username", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(registerRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
	});
});

let token = "";

describe("POST api/users/login", () => {
	const loginUrl = "/api/users/login";
	const loginRequest = {
		email: registerRequest.email,
		password: registerRequest.password
	};

	it("1. Success 200 - Token Response", async () => {
		const { statusCode, body } = await supertest(server)
			.post(loginUrl)
			.send(loginRequest);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("token");

		token = body.token;
	});

	it("2. Error 400 - Null Request Body", async () => {
		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send(undefined);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email");
		expect(body.errors).toHaveProperty("password");
	});

	it("3. Error 400 - Invalid Email", async () => {
		const invalidEmailRequest = {
			...loginRequest,
			email: "user123"
		};
		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send(invalidEmailRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email");
	});

	it("4. Error 400 - Email or Password is incorrect", async () => {
		const wrongPasswordRequest = {
			...loginRequest,
			password: "testlain123"
		};

		const secondRequest = await supertest(server)
			.post(loginUrl)
			.send(wrongPasswordRequest);

		expect(secondRequest.statusCode).toBe(400);
		expect(secondRequest.body).toHaveProperty("message");
		expect(secondRequest.body.message).toEqual(
			"Email or Password is incorrect"
		);
	});

	it("5. Error 404 - User not found", async () => {
		const wrongEmailRequest = {
			...loginRequest,
			email: "testlain@example.com"
		};

		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send(wrongEmailRequest);

		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message");
		expect(body.message).toEqual("User not found");
	});
});
// });
