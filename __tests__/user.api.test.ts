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

let tokenUserId1 = "";
let tokenUserId4 = "";
let tokenUserId5 = "";
let tokenUserId6 = "";
let tokenUserId7 = "";
let tokenUserId8 = "";

const userApiUrl = "/api/users";

const server = startServer();

beforeAll(async () => {
		await sequelize.sync({force: true});
});

afterAll(async () => {
		await sequelize.sync({force: true});
});

describe("POST api/users/register", () => {
	const registerUrl = `${userApiUrl}/register`;

	it("1. Error 400 - Null Request Body", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(undefined);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", ["Required"]);
		expect(body.errors).toHaveProperty("profile_image_url", ["Required"]);
		expect(body.errors).toHaveProperty("age", ["Required"]);
		expect(body.errors).toHaveProperty("password", ["Required"]);
		expect(body.errors).toHaveProperty("phone_number", ["Required"]);
		expect(body.errors).toHaveProperty("full_name", ["Required"]);
	});

	it("2. Error 400 - Invalid Request Body", async () => {
		const invalidRegisterRequest = {
			age: "",
			email: "",
			full_name: "",
			phone_number: "",
			profile_image_url: "",
			username: "",
			password: ""
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidRegisterRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", [
			"Cannot be empty",
			"Invalid email"
		]);
		expect(body.errors).toHaveProperty("full_name", ["Cannot be empty"]);
		expect(body.errors).toHaveProperty("phone_number", [
			"Cannot be empty",
			"Invalid phone number"
		]);
		expect(body.errors).toHaveProperty("profile_image_url", [
			"Cannot be empty",
			"Invalid url"
		]);
		expect(body.errors).toHaveProperty("username", ["Cannot be empty"]);
		expect(body.errors).toHaveProperty("password", ["Cannot be empty"]);
		expect(body.errors).toHaveProperty("age", ["Must be a number"]);
	});

	it("3. Error 400 - Invalid Request Body (2)", async () => {
		const invalidRegisterRequest = {
			age: -20,
			email: 2000,
			full_name: 1e5,
			phone_number: -1e10,
			profile_image_url: 89,
			username: 69420,
			password: 12321
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidRegisterRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", ["Must be a string"]);
		expect(body.errors).toHaveProperty("full_name", ["Must be a string"]);
		expect(body.errors).toHaveProperty("phone_number", [
			"Must be a string"
		]);
		expect(body.errors).toHaveProperty("profile_image_url", [
			"Must be a string"
		]);
		expect(body.errors).toHaveProperty("username", ["Must be a string"]);
		expect(body.errors).toHaveProperty("password", ["Must be a string"]);
		expect(body.errors).toHaveProperty("age", [
			"Must be a positive number"
		]);
	});

	it("4. Error 400 - Invalid Request Body (3)", async () => {
		const invalidRegisterRequest = {
			age: 1001,
			email: 2000,
			full_name: 1e5,
			phone_number: "ini082380539018",
			profile_image_url: "www.image.com",
			username: 69420,
			password: " ini adalah     password"
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidRegisterRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", ["Must be a string"]);
		expect(body.errors).toHaveProperty("full_name", ["Must be a string"]);
		expect(body.errors).toHaveProperty("phone_number", [
			"Invalid phone number"
		]);
		expect(body.errors).toHaveProperty("profile_image_url", [
			"Invalid url"
		]);
		expect(body.errors).toHaveProperty("username", ["Must be a string"]);
		expect(body.errors).toHaveProperty("password", [
			"Cannot contain whitespace"
		]);
		expect(body.errors).toHaveProperty("age", ["The number is too large"]);
	});

	it("5. Error 400 - Invalid Request Body (4)", async () => {
		const invalidRegisterRequest = {
			age: -10,
			email: "ini adalah email@example. com",
			full_name: 1e5,
			phone_number: "0823 8053 9018122",
			profile_image_url: "www.ini adalah image url.example.com",
			username: "iniadalah username 123",
			password: "iniadalah password 123"
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidRegisterRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", ["Invalid email"]);
		expect(body.errors).toHaveProperty("full_name", ["Must be a string"]);
		expect(body.errors).toHaveProperty("phone_number", [
			"Invalid phone number"
		]);
		expect(body.errors).toHaveProperty("profile_image_url", [
			"Invalid url"
		]);
		expect(body.errors).toHaveProperty("username", [
			"Cannot contain whitespace"
		]);
		expect(body.errors).toHaveProperty("password", [
			"Cannot contain whitespace"
		]);
		expect(body.errors).toHaveProperty("age", [
			"Must be a positive number"
		]);
	});

	it("6. Error 400 - Invalid Phone Number (Id format must 08xx-xxxx-xxxx)", async () => {
		const invalidRegisterRequest = {
			email: "iniuser1@example.com",
			full_name: "user test",
			username: "iniuser1",
			password: "test123",
			profile_image_url: "http://img-example.com",
			age: 10,
			phone_number: "012380539019"
		};

		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(invalidRegisterRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("phone_number", [
			"Invalid phone number"
		]);
	});

	it("7. Success 201 - Registration Success", async () => {
		const user: TUser = {
			email: "iniuser1@example.com",
			full_name: "user test",
			username: "iniuser1",
			password: "test123",
			profile_image_url: "http://img-example.com",
			age: 10,
			phone_number: "082380539019"
		};
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(user);

		expect(statusCode).toBe(201);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("8. Error 400 - Duplicate User Email", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(user1);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["email must be unique"]);
	});

	it("9. Error 400 - Duplicate User Username", async () => {
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send({ ...user1, email: "userlain@test.com" });

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["username must be unique"]);
	});

	it("10. Success 201 - Registration Success (2)", async () => {
		const user: TUser = {
			email: "ini-email.example@ex.com",
			age: 20,
			full_name: "Ini Full Name User",
			password: "IniPasswordUser",
			phone_number: "082380539018",
			username: "IniUsername",
			profile_image_url: "http://www.ini-url.ex.co.id"
		};
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(user);

		expect(statusCode).toBe(201);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("11. Success 201 - Registration Success (3)", async () => {
		const user: TUser = {
			email: "123454.tor.onion@example.com",
			age: 20,
			full_name: "Negara Kesatuan Republik Indonesia ...............",
			password: "nkri12345",
			phone_number: "082380539018",
			username: "username1231412",
			profile_image_url: "http://www.ini-url.ex.dot.id"
		};
		const { body, statusCode } = await supertest(server)
			.post(registerUrl)
			.send(user);

		// expect(body).toBe(111);
		expect(statusCode).toBe(201);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("12. Success 201 - Registration Success (4)", async () => {
		const user: TUser = {
			email: "123454.tor.onion@ini.gmail.example.com",
			age: 20,
			full_name:
				"@@ > ? > , Negara Kesatuan Republik Indonesia ...............",
			password: "nkri12345@@@>>>{{{'hayo_inipassword'",
			phone_number: "082380539018",
			username: "username123<><>",
			profile_image_url: "http://www.ini-url-awdwa-awdad.ex.dot.indo"
		};

		const { body, statusCode } = await supertest(server)
			.post(`${userApiUrl}/register`)
			.send(user);

		// expect(body).toBe(111);
		expect(statusCode).toBe(201);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("13. Success 201 - Registration Success (5)", async () => {
		const user: TUser = {
			email: "123454_tor_onion@ini.gmail.example.com",
			age: 20,
			full_name:
				"@@ > ? > , Negara Kesatuan Republik Indonesia ...............",
			password: "nkri12345_____{}",
			phone_number: "082380539018",
			username: "<src>alert('Hello_World');</src>",
			profile_image_url: "http://www.ini-url-awdwa-awdad.ex.dot.ea"
		};

		const { body, statusCode } = await supertest(server)
			.post(`${userApiUrl}/register`)
			.send(user);

		// expect(body).toBe(111);
		expect(statusCode).toBe(201);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});
});

describe("POST api/users/login", () => {
	const loginUrl = `${userApiUrl}/login`;
	const loginRequest = {
		email: user1.email,
		password: user1.password
	};

	it("1. Success 200 - Login With UserId 1", async () => {
		const { statusCode, body } = await supertest(server)
			.post(loginUrl)
			.send(loginRequest);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("token");

		tokenUserId1 = body.token;
	});

	it("2. Error 400 - empty value", async () => {
		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send({ email: "", password: "" });

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", [
			"Cannot be empty",
			"Invalid email"
		]);
		expect(body.errors).toHaveProperty("password", ["Cannot be empty"]);
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
		expect(body.errors).toHaveProperty("email", ["Invalid email"]);
	});

	it("4. Error 400 - Invalid Email (2)", async () => {
		const invalidEmailRequest = {
			...loginRequest,
			email: "user123@email@test.example.com"
		};
		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send(invalidEmailRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", ["Invalid email"]);
	});

	it("5. Error 400 - Password cannot contain whitespace", async () => {
		const invalidEmailRequest = {
			...loginRequest,
			password: "ini adalah password"
		};
		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send(invalidEmailRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("password", [
			"Cannot contain whitespace"
		]);
	});

	it("6. Error 400 - Email or Password is incorrect", async () => {
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

	it("7. Error 404 - User not found", async () => {
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

	it("8. Error 404 - User not found (2)", async () => {
		const wrongEmailRequest = {
			email: "testlain@example.com",
			password: "inipasswordanehlain"
		};

		const { body, statusCode } = await supertest(server)
			.post(loginUrl)
			.send(wrongEmailRequest);

		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message");
		expect(body.message).toEqual("User not found");
	});

	it("9. Success 200 - Login With UserId 5", async () => {
		const { statusCode, body } = await supertest(server)
			.post(loginUrl)
			.send({
				email: "123454.tor.onion@example.com",
				password: "nkri12345"
			});

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("token");

		tokenUserId5 = body.token;
	});

	it("10. Success 200 - Login With UserId 4", async () => {
		const { statusCode, body } = await supertest(server)
			.post(loginUrl)
			.send({
				email: "ini-email.example@ex.com",
				password: "IniPasswordUser"
			});

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("token");

		tokenUserId4 = body.token;
	});

	it("11. Success 200 - Login With UserId 7", async () => {
		const { statusCode, body } = await supertest(server)
			.post(loginUrl)
			.send({
				email: "123454_tor_onion@ini.gmail.example.com",
				password: "nkri12345_____{}"
			});

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("token");

		tokenUserId7 = body.token;
	});

	it("12. Success 200 - Login With UserId 6", async () => {
		const { statusCode, body } = await supertest(server)
			.post(loginUrl)
			.send({
				email: "123454.tor.onion@ini.gmail.example.com",
				password: "nkri12345@@@>>>{{{'hayo_inipassword'"
			});

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("token");

		tokenUserId6 = body.token;
	});
});

describe("PUT api/users/:id", () => {
	const updatedRequest: Omit<TUser, "password"> = {
		full_name: "new updated name",
		age: 21,
		email: "email_baru@example.gmail.com",
		phone_number: "088765432121",
		username: "iniusernamebaru",
		profile_image_url: "http://www.2.com"
	};

	it("0. Error 500 - Jwt Malformed", async () => {
		const { statusCode, body } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.set("token", "token");

		// expect(body).toBe(11);
		expect(statusCode).toBe(500);
		expect(body).toHaveProperty("err");
		expect(body.err).toHaveProperty("message", "jwt malformed");
		expect(body.err).toHaveProperty("name", "JsonWebTokenError");
	});

	it("1. Error 403 - authentication failed", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/10`)
			.send(updatedRequest);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Authentication Failed");
	});

	it("2. Error 400 - id params !== id in token authentication", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/100`)
			.set("token", tokenUserId1)
			.send(updatedRequest);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Invalid Credentials");
	});

	it("3. Error 400 - invalid id", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/[ini-id]`)
			.set("token", tokenUserId1)
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
			.set("token", tokenUserId1)
			.send(updateRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("email", [
			"Cannot be empty",
			"Invalid email"
		]);
		expect(body.errors).toHaveProperty("full_name", ["Cannot be empty"]);
		expect(body.errors).toHaveProperty("phone_number", [
			"Cannot be empty",
			"Invalid phone number"
		]);
		expect(body.errors).toHaveProperty("profile_image_url", [
			"Cannot be empty",
			"Invalid url"
		]);
		expect(body.errors).toHaveProperty("username", ["Cannot be empty"]);
	});

	it("5. Error 400 - Invalid Phone Number (Id format must 08xx-xxxx-xxx)", async () => {
		const updateRequest: Omit<TUser, "password"> = {
			...updatedRequest,
			phone_number: "023590904201"
		};

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.set("token", tokenUserId1)
			.send(updateRequest);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("phone_number", [
			"Invalid phone number"
		]);
	});

	it("6. Error 400 - conflict email unique from another user", async () => {
		const registerResponse = await supertest(server)
			.post(`${userApiUrl}/register`)
			.send(user2);

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.send({
				...registerResponse.body.user,
				username: "iniusernamelain"
			})
			.set("token", tokenUserId1);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["email must be unique"]);
	});

	it("7. Error 400 - conflict username unique from another user", async () => {
		const registerResponse = await supertest(server)
			.post(`${userApiUrl}/register`)
			.send(user3);

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.send({
				...registerResponse.body.user,
				email: "anotheremail@example.com"
			})
			.set("token", tokenUserId1);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toEqual(["username must be unique"]);
	});

	it("8. Success 200 - Update UserId 1", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.set("token", tokenUserId1)
			.send(updatedRequest);

		// expect(body).toBe(111);
		expect(statusCode).toBe(200);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("9. Success 200 - Update UserId 5", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/5`)
			.set("token", tokenUserId5)
			.send({
				...updatedRequest,
				email: "emailuserke5.iya@mail.com",
				username: "uniquereusername1"
			});

		// expect(body).toBe(111);
		expect(statusCode).toBe(200);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("10. Success 200 - back to first condition after Case #9", async () => {
		const user = {
			email: "123454.tor.onion@example.com",
			age: 20,
			full_name: "Negara Kesatuan Republik Indonesia ...............",
			phone_number: "082380539018",
			username: "username1231412",
			profile_image_url: "http://www.ini-url.ex.com"
		};

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/5`)
			.set("token", tokenUserId5)
			.send(user);

		// expect(body).toBe(111);
		expect(statusCode).toBe(200);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("11. Success 200 - Not Change From Previous Data", async () => {
		const user = {
			email: "123454_tor_onion@ini.gmail.example.com",
			age: 20,
			full_name:
				"@@ > ? > , Negara Kesatuan Republik Indonesia ...............",
			phone_number: "082380539018",
			username: "<src>alert('Hello_World');</src>",
			profile_image_url: "http://www.ini-url-awdwa-awdad.ex.com"
		};

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/7`)
			.set("token", tokenUserId7)
			.send(user);

		// expect(body);
		expect(statusCode).toBe(200);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});

	it("12. Success 200 - Update UserId 7", async () => {
		const user = {
			email: "12345412903182930812390281_tor_onion@iniadalahemailkuyangbaru.gmail.example.com",
			age: 200,
			full_name:
				"<src>while(true){alert('You Browser Is Being Hacked')}</src>",
			phone_number: "0823805390181",
			username: "<src>console.log(__dirname)</src>",
			profile_image_url: "http://www.ini-url-awdwa-awdad.ex.com"
		};

		const { body, statusCode } = await supertest(server)
			.put(`${userApiUrl}/7`)
			.set("token", tokenUserId7)
			.send(user);

		// expect(body);
		expect(statusCode).toBe(200);
		expect(body.user).toHaveProperty("email");
		expect(body.user).toHaveProperty("full_name");
		expect(body.user).toHaveProperty("username");
		expect(body.user).toHaveProperty("profile_image_url");
		expect(body.user).toHaveProperty("age");
		expect(body.user).toHaveProperty("phone_number");
	});
});

describe("DELETE api/users/:id", () => {
	it("0. Error 500 - Jwt Malformed", async () => {
		const { statusCode, body } = await supertest(server)
			.put(`${userApiUrl}/1`)
			.set("token", "token");

		// expect(body).toBe(11);
		expect(statusCode).toBe(500);
		expect(body).toHaveProperty("err");
		expect(body.err).toHaveProperty("message", "jwt malformed");
		expect(body.err).toHaveProperty("name", "JsonWebTokenError");
	});

	it("1. Error 403 - authentication failed", async () => {
		const { body, statusCode } = await supertest(server).delete(
			`${userApiUrl}/1`
		);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Authentication Failed");
	});

	it("2. Success 200 - user found and same as userId 1 in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/1`)
			.set("token", tokenUserId1);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your account has been successfully deleted");
	});

	it("3. Error 403 - id params not match with userId in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/1000`)
			.set("token", tokenUserId1);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Invalid Credentials");
	});

	it("4. Error 404 - after case #2 user still have the token but in database user have been deleted", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/1`)
			.set("token", tokenUserId1);

		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("User does not found");
	});

	it("5. Error 400 - invalid id params", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/[ini-id]`)
			.set("token", tokenUserId1);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("userId", ["Invalid User Id"]);
	});

	it("6. Error 400 - invalid id params (2)", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/${-2}`)
			.set("token", tokenUserId1);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("userId", ["Invalid User Id"]);
	});

	it("7. Success 200 - user found and same as userId 4 in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/4`)
			.set("token", tokenUserId4);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your account has been successfully deleted");
	});

	it("8. Success 200 - user found and same as userId 5 in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/${Math.sqrt(Math.sqrt(625))}`)
			.set("token", tokenUserId5);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your account has been successfully deleted");
	});

	it("9. Success 200 - user found and same as userId 7 in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/${Math.sqrt(49)}`)
			.set("token", tokenUserId7);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your account has been successfully deleted");
	});

	it("10. Success 200 - user found and same as userId 6 in token payload", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${userApiUrl}/${7 - 1}`)
			.set("token", tokenUserId6);

		// expect(body).toBe(11);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your account has been successfully deleted");
	});
});
