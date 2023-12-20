import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { startServer } from "../src/server.js";
import { sequelize } from "../src/db/db.js";
import supertest from "supertest";
const server = startServer();
const socialmediaApiUrl = "/api/socialmedias";
const KSocialmedia = {
    name: "name",
    social_media_url: "social_media_url"
};
const socialmedia = {
    name: "Onic Kiboy",
    social_media_url: "https://www.instagram.com/onic_kiboy/"
};
const user = {
    email: "iniuser@example.com",
    full_name: "user test",
    username: "iniuser",
    password: "test123",
    profile_image_url: "http://img-example.com",
    age: 10,
    phone_number: "082380539019"
};
let token = "";
let socialmediaId1 = "";
let socialmediaId2 = "";
let socialmediaId3 = "";
let socialmediaId4 = "";
let socialmediaId5 = "";
beforeAll(async () => {
    await sequelize.sync({ force: true });
    await supertest(server).post("/api/users/register").send(user);
    const { body } = await supertest(server)
        .post("/api/users/login")
        .send({ email: user.email, password: user.password });
    token = body.token;
});
afterAll(async () => {
    await sequelize.sync({ force: true });
});
describe("POST api/socialmedias", () => {
    const createSocialmediaUrl = `${socialmediaApiUrl}/`;
    it("0. Error 500 - Jwt Malformed", async () => {
        const { statusCode, body } = await supertest(server)
            .post(createSocialmediaUrl)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
    it("1. Error 403 - Authentication Failed", async () => {
        const { body, statusCode } = await supertest(server)
            .post(socialmediaApiUrl)
            .send(socialmedia);
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty("message", "Authentication Failed");
    });
    it("2. Error 400 - Empty Request Body", async () => {
        const { body, statusCode } = await supertest(server)
            .post(socialmediaApiUrl)
            .send(undefined)
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("name", ["Required"]);
        expect(body.errors).toHaveProperty("social_media_url", ["Required"]);
    });
    it("3. Error 400 - Invalid Request Body", async () => {
        const invalidSocialmediaRequest = {
            name: "",
            social_media_url: ""
        };
        const { body, statusCode } = await supertest(server)
            .post(createSocialmediaUrl)
            .send(invalidSocialmediaRequest)
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("name", ["Cannot be empty"]);
        expect(body.errors).toHaveProperty("social_media_url", [
            "Cannot be empty",
            "Invalid url"
        ]);
    });
    it("4. Error 400 - socialmedia name must be string", async () => {
        const { body, statusCode } = await supertest(server)
            .post(createSocialmediaUrl)
            .send({
            name: 12345
        })
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("name", ["Must be a string"]);
    });
    it("5. Error 400 - Invalid Social media Url", async () => {
        const { body, statusCode } = await supertest(server)
            .post(createSocialmediaUrl)
            .send({
            social_media_url: "www.awikwok.bdo.ad.com"
        })
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("social_media_url", ["Invalid url"]);
    });
    it("6. Success 201 - Socialmedia Created Successfully", async () => {
        const { body, statusCode } = await supertest(server)
            .post(socialmediaApiUrl)
            .send({
            name: "Onic Kairi",
            social_media_url: "https://www.instagram.com/onic_kairi/"
        })
            .set("token", token);
        console.log("Response Body:", body);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", "Onic Kairi");
        expect(body).toHaveProperty("social_media_url", "https://www.instagram.com/onic_kairi/");
        expect(body).toHaveProperty("UserId");
        socialmediaId1 = body.id;
    });
    it("7. Success 201 - Socialmedia Created Successful (2)", async () => {
        const socialmedia = {
            name: "0n1c_S4nz",
            social_media_url: "https://www.instagram.com/onic_sanz/"
        };
        const { body, statusCode } = await supertest(server)
            .post(socialmediaApiUrl)
            .set("token", token)
            .send(socialmedia);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", socialmedia.name);
        expect(body).toHaveProperty("social_media_url", socialmedia.social_media_url);
        expect(body).toHaveProperty("UserId");
        socialmediaId2 = body.id;
    });
    it("8. Success 201 - Socialmedia Created Successful (3)", async () => {
        const socialmedia = {
            name: "0n1c_CW",
            social_media_url: "https://www.instagram.com/onic_cw/"
        };
        const { body, statusCode } = await supertest(server)
            .post(socialmediaApiUrl)
            .set("token", token)
            .send(socialmedia);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", socialmedia.name);
        expect(body).toHaveProperty("social_media_url", socialmedia.social_media_url);
        expect(body).toHaveProperty("UserId");
        socialmediaId3 = body.id;
    });
    it("9. Success 201 - Socialmedia Created Successful (4)", async () => {
        const socialmedia = {
            name: "0n1c_Butss",
            social_media_url: "https://www.instagram.com/onic_butss/"
        };
        const { body, statusCode } = await supertest(server)
            .post(socialmediaApiUrl)
            .set("token", token)
            .send(socialmedia);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", socialmedia.name);
        expect(body).toHaveProperty("social_media_url", socialmedia.social_media_url);
        expect(body).toHaveProperty("UserId");
        socialmediaId4 = body.id;
    });
    it("10. Success 201 - Socialmedia Created Successful (5)", async () => {
        const socialmedia = {
            name: "0n1c_Albert",
            social_media_url: "https://www.instagram.com/onic_Albert/"
        };
        const { body, statusCode } = await supertest(server)
            .post(socialmediaApiUrl)
            .set("token", token)
            .send(socialmedia);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name", socialmedia.name);
        expect(body).toHaveProperty("social_media_url", socialmedia.social_media_url);
        expect(body).toHaveProperty("UserId");
        socialmediaId5 = body.id;
    });
});
let anotherToken = "";
describe("GET /api/socialmedias", () => {
    beforeAll(async () => {
        await supertest(server).post("/api/users/register").send({
            email: "userbaru@example.com",
            full_name: "user test",
            username: "userbaru",
            password: "test123",
            profile_image_url: "http://img-example.com",
            age: 10,
            phone_number: "082380539019"
        });
        const { body } = await supertest(server).post("/api/users/login").send({
            email: "userbaru@example.com",
            password: "test123"
        });
        anotherToken = body.token;
    });
    it("0. Error 500 - Jwt Malformed", async () => {
        const { statusCode, body } = await supertest(server)
            .get(`${socialmediaApiUrl}/1`)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
    it("1. Error 403 - Authentication Failed", async () => {
        const { body, statusCode } = await supertest(server).get(socialmediaApiUrl);
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty("message", "Authentication Failed");
    });
    it("2. Error 404 - Missing SocialmediaId", async () => {
        const { body, statusCode } = await supertest(server)
            .get(`${socialmediaApiUrl}/asdnakjdn`)
            .set("token", token);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("msg", "Route does not match anything");
    });
    it("3. Error 404 - Invalid Limit Parameter", async () => {
        const invalidLimit = "invalid";
        const response = await supertest(server)
            .get(`${socialmediaApiUrl}/limit=${invalidLimit}`)
            .set("token", token);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("msg", "Route does not match anything");
    });
    it("4. Error 404 - Invalid Page Parameter", async () => {
        const invalidPage = "invalid";
        const response = await supertest(server)
            .get(`${socialmediaApiUrl}/page=${invalidPage}`)
            .set("token", token);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("msg", "Route does not match anything");
    });
    it("5. Success 200 - Check Socialmedia Structure", async () => {
        const response = await supertest(server)
            .get(socialmediaApiUrl)
            .set("token", token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("socialmedias");
        expect(response.body.socialmedias).toBeInstanceOf(Array);
        if (response.body.socialmedias.length > 0) {
            const socialmedia = response.body.socialmedias[0];
            expect(socialmedia).toHaveProperty("id");
            expect(socialmedia).toHaveProperty("name");
            expect(socialmedia).toHaveProperty("social_media_url");
            expect(socialmedia).toHaveProperty("UserId");
            expect(socialmedia).toHaveProperty("createdAt");
            expect(socialmedia).toHaveProperty("updatedAt");
            expect(socialmedia).toHaveProperty("User");
            const user = socialmedia.User;
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("username");
        }
    });
    it("6. Success 200 - Check Socialmedia Pagination", async () => {
        const response = await supertest(server)
            .get(`${socialmediaApiUrl}?page=1&limit=5`)
            .set("token", token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("socialmedias");
        expect(response.body.socialmedias).toBeInstanceOf(Array);
        expect(response.body.socialmedias.length).toBeLessThanOrEqual(5);
    });
    it("7. Success 200 - match property", async () => {
        const { body, statusCode } = await supertest(server)
            .get(socialmediaApiUrl)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("socialmedias");
        body.socialmedias.every((socialmedia) => {
            expect(socialmedia).toHaveProperty("id");
            expect(socialmedia).toHaveProperty("name");
            expect(socialmedia).toHaveProperty("social_media_url");
            expect(socialmedia).toHaveProperty("UserId");
            expect(socialmedia).toHaveProperty("createdAt");
            expect(socialmedia).toHaveProperty("updatedAt");
            expect(socialmedia).toHaveProperty("User");
            expect(socialmedia.User).toHaveProperty("id");
            expect(socialmedia.User).toHaveProperty("username");
        });
    });
    it("8. Success 200 - Get All Social Media", async () => {
        const { body, statusCode } = await supertest(server)
            .get(socialmediaApiUrl)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("socialmedias");
        expect(body.socialmedias).toBeInstanceOf(Array);
        if (body.socialmedias.length > 0) {
            const socialmedia = body.socialmedias[0];
            expect(socialmedia).toHaveProperty("id");
            expect(socialmedia).toHaveProperty("name");
            expect(socialmedia).toHaveProperty("social_media_url");
            expect(socialmedia).toHaveProperty("UserId");
            expect(socialmedia).toHaveProperty("createdAt");
            expect(socialmedia).toHaveProperty("updatedAt");
            expect(socialmedia).toHaveProperty("User");
            expect(socialmedia.User).toHaveProperty("id");
            expect(socialmedia.User).toHaveProperty("username");
        }
    });
});
describe("PUT /api/socialmedias/:id", () => {
    it("0. Error 500 - Jwt Malformed", async () => {
        const { statusCode, body } = await supertest(server)
            .put(`${socialmediaApiUrl}/1`)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
    it("1. Error 403 - Authentication Failed", async () => {
        const { statusCode, body } = await supertest(server).put(`${socialmediaApiUrl}/1`);
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty("message", "Authentication Failed");
    });
    it("2. Error 404 - Cant access other user's socialmedia (search by UserId and SocialmediaId)", async () => {
        const { statusCode, body } = await supertest(server)
            .put(`${socialmediaApiUrl}/1`)
            .set("token", anotherToken)
            .send({
            name: "",
            social_media_url: "https://www.instagram.com/RRQ_Albert/"
        });
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message", "Socialmedia does not found");
    });
    it("3. Error 404 - Socialmedia Does Not Found (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/100`)
            .set("token", token)
            .send({
            name: "RRQ Albert",
            social_media_url: "https://www.instagram.com/RRQ_Albert/"
        });
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message", "Socialmedia does not found");
    });
    it("4. Error 400 - Invalid SocialmediaId", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/{iuni_idnih=13}`)
            .set("token", token)
            .send({
            name: "RRQ R7",
            social_media_url: "https://www.instagram.com/R7/"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("socialmediaId", [
            "Invalid SocialmediaId"
        ]);
    });
    it("5. Error 400 - Invalid PhotoId (2)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/${-12}`)
            .set("token", token)
            .send({
            name: "RRQ Oura",
            social_media_url: "https://www.instagram.com/RRQ_oura/"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("socialmediaId", [
            "Invalid SocialmediaId"
        ]);
    });
    it("6. Error 400 - Invalid PhotoId (3)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/012`)
            .set("token", token)
            .send({
            name: "RRQ Next Jack",
            social_media_url: "https://www.instagram.com/RRQ_Next_Jack/"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("socialmediaId", [
            "Invalid SocialmediaId"
        ]);
    });
    it("7. Error 400 - Invalid Request Body", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/12`)
            .set("token", token)
            .send({
            name: 12121,
            social_media_url: "www.instagram.comsadasdasd"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("name", [
            "Expected string, received number"
        ]);
        expect(body.errors).toHaveProperty("social_media_url", ["Invalid url"]);
    });
    it("8. Success 200 - SocialmediaId 1 Found (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/${socialmediaId1}`)
            .set("token", token)
            .send({
            name: "EVOS JESS NO LIMIT",
            social_media_url: "https://www.instagram.com/EVOS_jeSs/"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("socialmedia");
        expect(body.socialmedia).toHaveProperty("id");
        expect(body.socialmedia).toHaveProperty("name");
        expect(body.socialmedia).toHaveProperty("social_media_url");
    });
    it("9. Success 200 - SocialmediaId 2 Found (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/${socialmediaId2}`)
            .set("token", token)
            .send({
            name: "BTR UJANG",
            social_media_url: "https://www.instagram.com/BTR_UJANG/"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("socialmedia");
        expect(body.socialmedia).toHaveProperty("id");
        expect(body.socialmedia).toHaveProperty("name");
        expect(body.socialmedia).toHaveProperty("social_media_url");
    });
    it("10. Success 200 - SocialmediaId 3 Found (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/${socialmediaId3}`)
            .set("token", token)
            .send({
            name: "BTR ASEP",
            social_media_url: "https://www.instagram.com/BTR_ASEP/"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("socialmedia");
        expect(body.socialmedia).toHaveProperty("id");
        expect(body.socialmedia).toHaveProperty("name");
        expect(body.socialmedia).toHaveProperty("social_media_url");
    });
    it("11. Success 200 - SocialmediaId 4 Found (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/${socialmediaId4}`)
            .set("token", token)
            .send({
            name: "BTR JAJANG",
            social_media_url: "https://www.instagram.com/BTR_JAJANG/"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("socialmedia");
        expect(body.socialmedia).toHaveProperty("id");
        expect(body.socialmedia).toHaveProperty("name");
        expect(body.socialmedia).toHaveProperty("social_media_url");
    });
    it("12. Success 200 - SocialmediaId 5 Found (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${socialmediaApiUrl}/${socialmediaId4}`)
            .set("token", token)
            .send({
            name: "BTR SODIKIN",
            social_media_url: "https://www.instagram.com/BTR_SODIKIN/"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("socialmedia");
        expect(body.socialmedia).toHaveProperty("id");
        expect(body.socialmedia).toHaveProperty("name");
        expect(body.socialmedia).toHaveProperty("social_media_url");
    });
});
describe("DELETE /api/socialmedias/:id", () => {
    it("0. Error 500 - Jwt Malformed", async () => {
        const { statusCode, body } = await supertest(server)
            .put(`${socialmediaApiUrl}/1`)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
    it("1. Error 403 - authentication failed", async () => {
        const { body, statusCode } = await supertest(server).delete(`${socialmediaApiUrl}/1`);
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Authentication Failed");
    });
    it("2. Error 404 - Socialmedia with UserId in token payload does not exists (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/${1000}`)
            .set("token", token);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Socialmedia does not found");
    });
    it("3. Error 404 - Missing SocialmediaId", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/`)
            .set("token", token);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("msg", "Route does not match anything");
    });
    it("4. Error 404 - Socialmedia not found (search by SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/1234567890`)
            .set("token", token);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message", "Socialmedia does not found");
    });
    it("5. Success 200 - socialmediaId1 with user in token payload exists (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/${socialmediaId1}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your socialmedia has been successfully deleted");
    });
    it("6. Success 200 - socialmediaId2 with user in token payload exists (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/${socialmediaId2}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your socialmedia has been successfully deleted");
    });
    it("7. Success 200 - socialmediaId3 with user in token payload exists (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/${socialmediaId3}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your socialmedia has been successfully deleted");
    });
    it("8. Success 200 - socialmediaId4 with user in token payload exists (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/${socialmediaId4}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your socialmedia has been successfully deleted");
    });
    it("9. Success 200 - socialmediaId5 with user in token payload exists (search by UserId and SocialmediaId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${socialmediaApiUrl}/${socialmediaId5}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your socialmedia has been successfully deleted");
    });
});
//# sourceMappingURL=socialmedia.api.test.js.map