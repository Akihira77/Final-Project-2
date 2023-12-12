import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { sequelize } from "../src/db/db.js";
import supertest from "supertest";
import { startServer } from "../src/server.js";

const server = startServer();
const photoApiUrl = "/api/photos";

type TPhoto = { poster_image_url: string; title: string; caption: string };
const KPhoto: Record<keyof TPhoto, keyof TPhoto> = {
	title: "title",
	caption: "caption",
	poster_image_url: "poster_image_url"
};

const photo1: TPhoto = {
	title: "title 1",
	caption: "caption 1",
	poster_image_url: "http://www.poster1.com"
};

const user1 = {
	email: "iniuser1@example.com",
	full_name: "user test",
	username: "iniuser1",
	password: "test123",
	profile_image_url: "http://img-example.com",
	age: 10,
	phone_number: "082380539019"
};

let token = "";

beforeAll(async () => {
	await sequelize.query(`DELETE FROM "Photos"`);
	await supertest(server).post("/api/users/register").send(user1);
	const { body } = await supertest(server)
		.post("/api/users/login")
		.send({ email: user1.email, password: user1.password });

	token = body.token;
});

afterAll(async () => {
	await sequelize.sync({ force: true });
});

describe("POST /api/photos", () => {
	it("1. Error 403 - Authentication Failed", async () => {
		const { body, statusCode } = await supertest(server)
			.post(photoApiUrl)
			.send(photo1);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message", "Authentication Failed");
	});

	it("2. Error 400 - Empty Request Body", async () => {
		const { body, statusCode } = await supertest(server)
			.post(photoApiUrl)
			.send(undefined)
			.set("token", token);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("caption", ["Required"]);
		expect(body.errors).toHaveProperty("title", ["Required"]);
		expect(body.errors).toHaveProperty("poster_image_url", ["Required"]);
	});

	it("3. Error 400 - Invalid Request Body", async () => {
		const invalidRequest = {
			title: "",
			caption: "",
			poster_image_url: ""
		};

		const { body, statusCode } = await supertest(server)
			.post(photoApiUrl)
			.send(invalidRequest)
			.set("token", token);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("title", ["Cannot be empty"]);
		expect(body.errors).toHaveProperty("caption", ["Cannot be empty"]);
		expect(body.errors).toHaveProperty("poster_image_url", [
			"Cannot be empty",
			"Invalid url"
		]);
	});

	it("4. Error 400 - Invalid Request Body (2)", async () => {
		const { body, statusCode } = await supertest(server)
			.post(photoApiUrl)
			.send({
				title: 1234,
				caption: 123123,
				poster_image_url: "http://test.example.com111"
			})
			.set("token", token);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("title", ["Must be a string"]);
		expect(body.errors).toHaveProperty("caption", ["Must be a string"]);
	});

	it("5. Success 201 - Photo Created Successful", async () => {
		const { body, statusCode } = await supertest(server)
			.post(photoApiUrl)
			.send(photo1)
			.set("token", token);

		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("title", photo1.title);
		expect(body).toHaveProperty("caption", photo1.caption);
		expect(body).toHaveProperty(
			"poster_image_url",
			photo1.poster_image_url
		);
		expect(body).toHaveProperty("UserId");
	});
});
