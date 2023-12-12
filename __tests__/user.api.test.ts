import { afterAll, beforeAll, describe, expect, it, test } from "@jest/globals";
import { startServer } from "../src/server.js";
import { sequelize } from "../src/db/db.js";
import supertest from "supertest";

type TUser = {
	email: string;
	full_name: string;
	username: string;
	password: string;
	profile_image_url: string;
	age: number;
	phone_number: string;
};

const KUser: Record<keyof TUser, string> = {
	age: "age",
	email: "email",
	full_name: "full_name",
	password: "password",
	phone_number: "phone_number",
	profile_image_url: "profile_image_url",
	username: "username"
};

const server = startServer();

beforeAll(async () => {
	await sequelize.sync({ force: true });
});

// afterAll(async () => {
// 	await sequelize.sync({ force: true });
// });

const user1: TUser = {
	email: "iniuser1@example.com",
	full_name: "user test",
	username: "iniuser1",
	password: "test123",
	profile_image_url: "http://img-example.com",
	age: 10,
	phone_number: "082380539019"
};

const user2: TUser = {
	...user1,
	email: "iniuser2@test.com",
	username: "iniuser2"
};

const user3: TUser = {
	...user1,
	email: "iniuser3@example.com",
	username: "iniuser3"
};

let savedUser: Omit<TUser, "password">;
let token = "";

const userApiUrl = "/api/users";
describe("POST api/users/register", () => {
	const registerUrl = `${userApiUrl}/register`;

	it("1. Error 400 - Null Request Body", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(undefined);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty(KUser["email"], ["Required"]);
		expect(body.errors).toHaveProperty(KUser["profile_image_url"], [
			"Required"
		]);
		expect(body.errors).toHaveProperty(KUser["age"], ["Required"]);
		expect(body.errors).toHaveProperty(KUser["password"], ["Required"]);
		expect(body.errors).toHaveProperty(KUser["phone_number"], ["Required"]);
		expect(body.errors).toHaveProperty(KUser["full_name"], ["Required"]);
	});

	it("2. Error 400 - Invalid Request Body", async () => {
		const invalidRegisterRequest = {
			age: "",
			email: "",
			full_name: "",
			phone_number: "",
			profile_image_url: "",
			username: ""
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidRegisterRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty(KUser["email"], [
			"Cannot be empty",
			"Invalid email"
		]);
		expect(body.errors).toHaveProperty(KUser["full_name"], [
			"Cannot be empty"
		]);
		expect(body.errors).toHaveProperty(KUser["phone_number"], [
			"Cannot be empty"
		]);
		expect(body.errors).toHaveProperty(KUser["profile_image_url"], [
			"Cannot be empty",
			"Invalid url"
		]);
		expect(body.errors).toHaveProperty(KUser["username"], [
			"Cannot be empty"
		]);
		expect(body.errors).toHaveProperty(KUser["age"], ["Must be a number"]);
	});

	it("3. Success 201 - Registration Success", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(user1);

		expect(statusCode).toBe(201);
		expect(body.user).toHaveProperty(KUser["email"]);
		expect(body.user).toHaveProperty(KUser["full_name"]);
		expect(body.user).toHaveProperty(KUser["username"]);
		expect(body.user).toHaveProperty(KUser["profile_image_url"]);
		expect(body.user).toHaveProperty(KUser["age"]);
		expect(body.user).toHaveProperty(KUser["phone_number"]);

		savedUser = body.user;
	});

	it("4. Error 400 - Duplicate User Email", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(user1);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["email must be unique"]);
	});

	it("5. Error 400 - Duplicate User Username", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send({ ...user1, email: "userlain@test.com" });

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["username must be unique"]);
	});
});

describe("POST api/users/login", () => {
	const loginUrl = `${userApiUrl}/login`;
	const loginRequest = {
		email: user1.email,
		password: user1.password
	};

	it("1. Success 200 - Token Response", async () => {
		const { statusCode, body } = await supertest(server)
			.post(loginUrl)
			.send(loginRequest);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("token");

		token = body.token;
	});

	it("2. Error 400 - empty value", async () => {
		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send({ email: "", password: "" });

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty(KUser["email"], [
			"Cannot be empty",
			"Invalid email"
		]);
		expect(body.errors).toHaveProperty(KUser["password"], [
			"Cannot be empty"
		]);
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
		expect(body.errors).toHaveProperty(KUser["email"], ["Invalid email"]);
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

describe("PUT api/users/:id", () => {
	it("1. Error 403 - authentication failed", async () => {
		const updatedRequest = {
			...savedUser,
			full_name: "new updated name"
		};
		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/10`)
			.send(updatedRequest);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Authentication Failed");
	});

	it("2. Error 400 - id params !== id in token authentication", async () => {
		const updatedRequest = {
			...savedUser,
			full_name: "new updated name"
		};
		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/100`)
			.set("token", token)
			.send(updatedRequest);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Invalid Credentials");
	});

	it("3. Error 400 - invalid id", async () => {
		const updatedRequest = {
			...savedUser,
			full_name: "new updated name"
		};

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/[ini-id]`)
			.set("token", token)
			.send(updatedRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("userId", ["Invalid User Id"]);
	});

	it("4. Error 400 - Invalid request body", async () => {
		const updateRequest: Omit<TUser, "password"> = {
			age: 0,
			email: "",
			full_name: "",
			phone_number: "",
			profile_image_url: "",
			username: ""
		};

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.set("token", token)
			.send(updateRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty(KUser["email"], [
			"Cannot be empty",
			"Invalid email"
		]);
		expect(body.errors).toHaveProperty(KUser["full_name"], [
			"Cannot be empty"
		]);
		expect(body.errors).toHaveProperty(KUser["phone_number"], [
			"Cannot be empty"
		]);
		expect(body.errors).toHaveProperty(KUser["profile_image_url"], [
			"Cannot be empty",
			"Invalid url"
		]);
		expect(body.errors).toHaveProperty(KUser["username"], [
			"Cannot be empty"
		]);
	});

	it("5. Error 400 - conflict email unique from another user", async () => {
		const registerResponse = await supertest(server)
			.post(`${userApiUrl}/register`)
			.send(user2);

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.set("token", token)
			.send({
				...registerResponse.body.user,
				username: "ini username lain"
			});

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["email must be unique"]);
	});

	it("6. Error 400 - conflict username unique from another user", async () => {
		const registerResponse = await supertest(server)
			.post(`${userApiUrl}/register`)
			.send(user3);

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.set("token", token)
			.send({
				...registerResponse.body.user,
				email: "anotheremail@example.com"
			});

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["username must be unique"]);
	});
});

describe("DELETE api/users/:id", () => {
	it("1. Error 403 - authentication failed", async () => {
		const { body, statusCode } = await supertest(server).delete(
			`${userApiUrl}/1`
		);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Authentication Failed");
	});

	it("2. Success 200 - user found and same as userId in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/1`)
			.set("token", token);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your account has been successfully deleted");
	});

	it("3. Error 403 - id params not match with userId in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/1000`)
			.set("token", token);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Invalid Credentials");
	});

	it("4. Error 404 - after case (2) user still have the token but in database user alreday be deleted", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/1`)
			.set("token", token);

		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("User does not found");
	});

	it("5. Error 400 - invalid id params", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/[ini-id]`)
			.set("token", token);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("userId", ["Invalid User Id"]);
	});
});
