import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { sequelize } from "../src/db/db.js";
import supertest from "supertest";
import { startServer } from "../src/server.js";
const server = startServer();
const photoApiUrl = "/api/photos";
const KPhoto = {
    title: "title",
    caption: "caption",
    poster_image_url: "poster_image_url"
};
const photo1 = {
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
let photoId1 = "";
let photoId2 = "";
let photoId3 = "";
let photoId4 = "";
let photoId5 = "";
beforeAll(async () => {
    await sequelize.sync({ force: true });
    await supertest(server).post("/api/users/register").send(user1);
    const { body } = await supertest(server)
        .post("/api/users/login")
        .send({ email: user1.email, password: user1.password });
    token = body.token;
});
afterAll(async () => {
});
describe("POST /api/photos", () => {
    it("0. Error 500 - Jwt Malformed", async () => {
        const { statusCode, body } = await supertest(server)
            .post(`${photoApiUrl}/1`)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
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
    it("4. Error 400 - Title and Caption must be string", async () => {
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
    it("5. Error 400 - Invalid Poster Image Url", async () => {
        const { body, statusCode } = await supertest(server)
            .post(photoApiUrl)
            .send({
            title: "    1234",
            caption: "ini caption @ @ @ < > < > < {} [} 123123",
            poster_image_url: "www.ini-link-beneran.dot.id"
        })
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("poster_image_url", ["Invalid url"]);
    });
    it("6. Success 201 - Photo Created Successful", async () => {
        const { body, statusCode } = await supertest(server)
            .post(photoApiUrl)
            .send(photo1)
            .set("token", token);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("title", photo1.title);
        expect(body).toHaveProperty("caption", photo1.caption);
        expect(body).toHaveProperty("poster_image_url", photo1.poster_image_url);
        expect(body).toHaveProperty("UserId");
        photoId1 = body.id;
    });
    it("7. Success 201 - Photo Created Successful (2)", async () => {
        const photo = {
            title: "ini 4d4l<>h !@#$%^&&*()",
            caption: "aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            poster_image_url: "http://www.your-being-hacked.dot.us"
        };
        const { body, statusCode } = await supertest(server)
            .post(photoApiUrl)
            .set("token", token)
            .send(photo);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("title", photo.title);
        expect(body).toHaveProperty("caption", photo.caption);
        expect(body).toHaveProperty("poster_image_url", photo.poster_image_url);
        expect(body).toHaveProperty("UserId");
        photoId2 = body.id;
    });
    it("8. Success 201 - Photo Created Successful (3)", async () => {
        const photo = {
            title: "ini 4d4l<>h !@#$%^&&*()",
            caption: `ini adalah caption 
				terbaik, coba saja 
				lihat dengan caption photo yang lain
				tidak ada tandingannya`,
            poster_image_url: "https://your-being-hacked.dot.indo"
        };
        const { body, statusCode } = await supertest(server)
            .post(photoApiUrl)
            .set("token", token)
            .send(photo);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("title", photo.title);
        expect(body).toHaveProperty("caption", photo.caption);
        expect(body).toHaveProperty("poster_image_url", photo.poster_image_url);
        expect(body).toHaveProperty("UserId");
        photoId3 = body.id;
    });
    it("9. Success 201 - Photo Created Successful (4)", async () => {
        const photo = {
            title: "ini 4d4l<>h !@#$%^&&*()",
            caption: `Ac turpis egestas sed tempus urna. Tempor commodo ullamcorper a lacus vestibulum. Mattis rhoncus urna neque viverra justo nec ultrices dui sapien. Integer eget aliquet nibh praesent. Integer eget aliquet nibh praesent tristique.`,
            poster_image_url: "https://ini-example.com/Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed-do-eiusmod-tempor-incididunt/image.png"
        };
        const { body, statusCode } = await supertest(server)
            .post(photoApiUrl)
            .set("token", token)
            .send(photo);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("title", photo.title);
        expect(body).toHaveProperty("caption", photo.caption);
        expect(body).toHaveProperty("poster_image_url", photo.poster_image_url);
        expect(body).toHaveProperty("UserId");
        photoId4 = body.id;
    });
    it("10. Success 201 - Photo Created Successful (5)", async () => {
        const photo = {
            title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
			Elementum sagittis vitae et leo duis ut diam quam nulla. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula.`,
            caption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Elementum sagittis vitae et leo duis ut diam quam nulla. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula.`,
            poster_image_url: "https://ini-example.com/Lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua-Habitant-morbi-tristique-senectus-et-netus-et-malesuada/image.png"
        };
        const { body, statusCode } = await supertest(server)
            .post(photoApiUrl)
            .set("token", token)
            .send(photo);
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("title", photo.title);
        expect(body).toHaveProperty("caption", photo.caption);
        expect(body).toHaveProperty("poster_image_url", photo.poster_image_url);
        expect(body).toHaveProperty("UserId");
        photoId5 = body.id;
    });
});
let anotherToken = "";
describe("GET /api/photos", () => {
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
            .get(`${photoApiUrl}/1`)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
    it("1. Error 403 - Authentication Failed", async () => {
        const { body, statusCode } = await supertest(server).get(photoApiUrl);
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty("message", "Authentication Failed");
    });
    it("2. Error 404 - Missing PhotoId", async () => {
        const { body, statusCode } = await supertest(server)
            .get(`${photoApiUrl}/asdnakjdn`)
            .set("token", token);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("msg", "Route does not match anything");
    });
    it("3. Error 404 - Invalid Limit Parameter", async () => {
        const invalidLimit = "invalid";
        const response = await supertest(server)
            .get(`${photoApiUrl}/limit=${invalidLimit}`)
            .set("token", token);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("msg", "Route does not match anything");
    });
    it("4. Error 404 - Invalid Page Parameter", async () => {
        const invalidPage = "invalid";
        const response = await supertest(server)
            .get(`${photoApiUrl}/page=${invalidPage}`)
            .set("token", token);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("msg", "Route does not match anything");
    });
    it("5. Success 200 - different user get the same response", async () => {
        const response1 = await supertest(server)
            .get(photoApiUrl)
            .set("token", token);
        const response2 = await supertest(server)
            .get(photoApiUrl)
            .set("token", anotherToken);
        expect(response1.statusCode).toEqual(response2.statusCode);
        expect(response1.body).toEqual(response2.body);
    });
    it("6. Success 200 - match property", async () => {
        const { body, statusCode } = await supertest(server)
            .get(photoApiUrl)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photos");
        body.photos.every((photo) => {
            expect(photo).toHaveProperty("id");
            expect(photo).toHaveProperty("title");
            expect(photo).toHaveProperty("caption");
            expect(photo).toHaveProperty("poster_image_url");
            expect(photo).toHaveProperty("UserId");
            expect(photo).toHaveProperty("createdAt");
            expect(photo).toHaveProperty("updatedAt");
            expect(photo).toHaveProperty("Comments");
            expect(photo).toHaveProperty("User");
            expect(photo.User).toHaveProperty("id");
            expect(photo.User).toHaveProperty("username");
            expect(photo.User).toHaveProperty("profile_image_url");
        });
    });
    it("7. Success 200 - match property data type (empty comments)", async () => {
        const { body, statusCode } = await supertest(server)
            .get(photoApiUrl)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photos");
        expect(Array.isArray(body.photos)).toBe(true);
        body.photos.every(({ id, title, caption, poster_image_url, createdAt, updatedAt, Comments, User, UserId }) => {
            expect(typeof id).toBe("number");
            expect(typeof title).toBe("string");
            expect(typeof caption).toBe("string");
            expect(typeof poster_image_url).toBe("string");
            expect(typeof UserId).toBe("number");
            expect(new Date(createdAt) !== null).toBe(true);
            expect(new Date(updatedAt) !== null).toBe(true);
            expect(Array.isArray(Comments)).toBe(true);
            expect(User && typeof User === "object").toBe(true);
            expect(typeof User.id).toBe("number");
            expect(typeof User.username).toBe("string");
            expect(typeof User.profile_image_url).toBe("string");
        });
    });
    it("8. Success 200 - match property data type (have comments)", async () => {
        const comment = {
            comment: "this is comment",
            PhotoId: photoId1
        };
        await supertest(server)
            .post("/api/comments")
            .set("token", token)
            .send(comment);
        const { body, statusCode } = await supertest(server)
            .get(photoApiUrl)
            .set("token", anotherToken);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photos");
        expect(Array.isArray(body.photos)).toBe(true);
        body.photos.every(({ id, title, caption, poster_image_url, createdAt, updatedAt, Comments, User, UserId }) => {
            expect(typeof id).toBe("number");
            expect(typeof title).toBe("string");
            expect(typeof caption).toBe("string");
            expect(typeof poster_image_url).toBe("string");
            expect(typeof UserId).toBe("number");
            expect(new Date(createdAt) !== null).toBe(true);
            expect(new Date(updatedAt) !== null).toBe(true);
            expect(Array.isArray(Comments)).toBe(true);
            Comments.every(({ User, comment }) => {
                expect(typeof comment).toBe("string");
                expect(User && typeof User === "object").toBe(true);
                expect(typeof User.username).toBe("string");
            });
            expect(User && typeof User === "object").toBe(true);
            expect(typeof User.id).toBe("number");
            expect(typeof User.username).toBe("string");
            expect(typeof User.profile_image_url).toBe("string");
        });
    });
});
describe("PUT /api/photos/:id", () => {
    it("0. Error 500 - Jwt Malformed", async () => {
        const { statusCode, body } = await supertest(server)
            .put(`${photoApiUrl}/1`)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
    it("1. Error 403 - Authentication Failed", async () => {
        const { statusCode, body } = await supertest(server).put(`${photoApiUrl}/1`);
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty("message", "Authentication Failed");
    });
    it("2. Error 404 - Cant access other user's photo (search by UserId and PhotoId)", async () => {
        const { statusCode, body } = await supertest(server)
            .put(`${photoApiUrl}/1`)
            .set("token", anotherToken)
            .send({
            title: "",
            caption: "",
            poster_image_url: "http://example.com"
        });
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message", "Photo does not found");
    });
    it("3. Error 404 - Photo Does Not Found (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/100`)
            .set("token", token)
            .send({
            title: "title baru",
            caption: `caption
				terbarui nih bos`,
            poster_image_url: "http://www.image-baru.com/image.jpg"
        });
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message", "Photo does not found");
    });
    it("4. Error 400 - Invalid PhotoId", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/{iuni_idnih=13}`)
            .set("token", token)
            .send({
            title: "tile baru",
            caption: `caption
				terbarui nih bos`,
            poster_image_url: "http://www.image-baru.com/image.jpg"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("photoId", ["Invalid Photo Id"]);
    });
    it("5. Error 400 - Invalid PhotoId (2)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/${-12}`)
            .set("token", token)
            .send({
            title: "tile baru",
            caption: `caption
				terbarui nih bos`,
            poster_image_url: "http://www.image-baru.com/image.jpg"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("photoId", ["Invalid Photo Id"]);
    });
    it("6. Error 400 - Invalid PhotoId (3)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/012`)
            .set("token", token)
            .send({
            title: "tile baru",
            caption: `caption
				terbarui nih bos`,
            poster_image_url: "http://www.image-baru.com/image.jpg"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("photoId", ["Invalid Photo Id"]);
    });
    it("7. Error 400 - Invalid Request Body", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/12`)
            .set("token", token)
            .send({
            title: 12321,
            caption: 12321,
            poster_image_url: ""
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("title", ["Must be a string"]);
        expect(body.errors).toHaveProperty("caption", ["Must be a string"]);
        expect(body.errors).toHaveProperty("poster_image_url", ["Invalid url"]);
    });
    it("8. Error 400 - Invalid Request Body (2) max string 255 character", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/12`)
            .set("token", token)
            .send({
            title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer enim neque volutpat ac tincidunt vitae semper. Tincidunt arcu non sodales neque. Sapien eget mi proin sed libero enim sed faucibus. Nunc sed velit dignissim sodales ut. Arcu dictum varius duis at consectetur lorem donec massa sapien. Justo nec ultrices dui sapien eget mi proin. Morbi blandit cursus risus at ultrices. Non consectetur a erat nam at. Ut lectus arcu bibendum at varius. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Sed turpis tincidunt id aliquet risus feugiat in. Aliquam id diam maecenas ultricies. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Nullam vehicula ipsum a arcu cursus vitae. Pellentesque massa placerat duis ultricies lacus sed turpis.

Urna neque viverra justo nec ultrices. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Etiam sit amet nisl purus. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Sollicitudin aliquam ultrices sagittis orci a scelerisque. Sit amet volutpat consequat mauris nunc congue nisi. Ultrices in iaculis nunc sed augue lacus viverra vitae congue. Donec ac odio tempor orci dapibus. Viverra nam libero justo laoreet sit amet cursus sit. Elit pellentesque habitant morbi tristique senectus et. Et malesuada fames ac turpis egestas integer eget. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Cras sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas dui. Sollicitudin tempor id eu nisl. A condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Id nibh tortor id aliquet lectus proin nibh nisl condimentum.

Viverra nam libero justo laoreet sit amet cursus sit. Quis auctor elit sed vulputate mi. Nibh tortor id aliquet lectus proin nibh nisl. Morbi blandit cursus risus at. Risus in hendrerit gravida rutrum quisque non. Amet nisl suscipit adipiscing bibendum est ultricies. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Eget nunc lobortis mattis aliquam faucibus. Viverra vitae congue eu consequat ac felis donec et. Viverra suspendisse potenti nullam ac tortor vitae. Libero enim sed faucibus turpis in eu mi bibendum. Lacus viverra vitae congue eu consequat ac. Blandit massa enim nec dui nunc mattis enim ut tellus. Feugiat in fermentum posuere urna. Ullamcorper malesuada proin libero nunc consequat interdum.

Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Ut tellus elementum sagittis vitae. Eu mi bibendum neque egestas congue quisque egestas diam. Fermentum odio eu feugiat pretium nibh ipsum. At urna condimentum mattis pellentesque id nibh tortor. Sit amet nisl suscipit adipiscing. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Purus semper eget duis at tellus at urna condimentum mattis. Enim ut tellus elementum sagittis vitae et leo.

Turpis egestas integer eget aliquet. Accumsan sit amet nulla facilisi morbi. Amet venenatis urna cursus eget nunc. Proin nibh nisl condimentum id venenatis a condimentum vitae. Aliquet nec ullamcorper sit amet risus. Pretium nibh ipsum consequat nisl vel pretium. Euismod elementum nisi quis eleifend. Nulla facilisi morbi tempus iaculis urna. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Duis at consectetur lorem donec. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Sed cras ornare arcu dui vivamus arcu felis bibendum. At ultrices mi tempus imperdiet nulla malesuada. Id donec ultrices tincidunt arcu non sodales. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Dictum varius duis at consectetur.`,
            caption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer enim neque volutpat ac tincidunt vitae semper. Tincidunt arcu non sodales neque. Sapien eget mi proin sed libero enim sed faucibus. Nunc sed velit dignissim sodales ut. Arcu dictum varius duis at consectetur lorem donec massa sapien. Justo nec ultrices dui sapien eget mi proin. Morbi blandit cursus risus at ultrices. Non consectetur a erat nam at. Ut lectus arcu bibendum at varius. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Sed turpis tincidunt id aliquet risus feugiat in. Aliquam id diam maecenas ultricies. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Nullam vehicula ipsum a arcu cursus vitae. Pellentesque massa placerat duis ultricies lacus sed turpis.

Urna neque viverra justo nec ultrices. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Etiam sit amet nisl purus. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Sollicitudin aliquam ultrices sagittis orci a scelerisque. Sit amet volutpat consequat mauris nunc congue nisi. Ultrices in iaculis nunc sed augue lacus viverra vitae congue. Donec ac odio tempor orci dapibus. Viverra nam libero justo laoreet sit amet cursus sit. Elit pellentesque habitant morbi tristique senectus et. Et malesuada fames ac turpis egestas integer eget. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Cras sed felis eget velit aliquet. Accumsan lacus vel facilisis volutpat est velit egestas dui. Sollicitudin tempor id eu nisl. A condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Id nibh tortor id aliquet lectus proin nibh nisl condimentum.

Viverra nam libero justo laoreet sit amet cursus sit. Quis auctor elit sed vulputate mi. Nibh tortor id aliquet lectus proin nibh nisl. Morbi blandit cursus risus at. Risus in hendrerit gravida rutrum quisque non. Amet nisl suscipit adipiscing bibendum est ultricies. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Eget nunc lobortis mattis aliquam faucibus. Viverra vitae congue eu consequat ac felis donec et. Viverra suspendisse potenti nullam ac tortor vitae. Libero enim sed faucibus turpis in eu mi bibendum. Lacus viverra vitae congue eu consequat ac. Blandit massa enim nec dui nunc mattis enim ut tellus. Feugiat in fermentum posuere urna. Ullamcorper malesuada proin libero nunc consequat interdum.

Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Ut tellus elementum sagittis vitae. Eu mi bibendum neque egestas congue quisque egestas diam. Fermentum odio eu feugiat pretium nibh ipsum. At urna condimentum mattis pellentesque id nibh tortor. Sit amet nisl suscipit adipiscing. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Purus semper eget duis at tellus at urna condimentum mattis. Enim ut tellus elementum sagittis vitae et leo.

Turpis egestas integer eget aliquet. Accumsan sit amet nulla facilisi morbi. Amet venenatis urna cursus eget nunc. Proin nibh nisl condimentum id venenatis a condimentum vitae. Aliquet nec ullamcorper sit amet risus. Pretium nibh ipsum consequat nisl vel pretium. Euismod elementum nisi quis eleifend. Nulla facilisi morbi tempus iaculis urna. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Duis at consectetur lorem donec. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Sed cras ornare arcu dui vivamus arcu felis bibendum. At ultrices mi tempus imperdiet nulla malesuada. Id donec ultrices tincidunt arcu non sodales. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Dictum varius duis at consectetur.`,
            poster_image_url: "http://www.ini-url-awdwa-awdad.ex.dot.ea"
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("title", ["Value is too long"]);
        expect(body.errors).toHaveProperty("caption", ["Value is too long"]);
    });
    it("9. Success 200 - PhotoId 1 Found (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/${photoId1}`)
            .set("token", token)
            .send({
            title: "12321",
            caption: "12321",
            poster_image_url: "http://www.test.co.id/image.pdf"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photo");
        expect(body.photo).toHaveProperty("id");
        expect(body.photo).toHaveProperty("title");
        expect(body.photo).toHaveProperty("caption");
        expect(body.photo).toHaveProperty("poster_image_url");
    });
    it("10. Success 200 - PhotoId 2 Found (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/${photoId2}`)
            .set("token", token)
            .send({
            title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Tincidunt arcu non sodales neque. Sapien eget mi proin sed libero enim sed faucibus.`,
            caption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Tincidunt arcu non sodales neque. Sapien eget mi proin sed libero enim sed faucibus.`,
            poster_image_url: "http://www.Non-consectetur-a-erat-nam-at-Ut-lectus-arcu-bibendum.co.id/at-varius-Tempor-commodo-ullamcorper-a-lacus-vestibulum-sed-arcu-non/image.pdf"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photo");
        expect(body.photo).toHaveProperty("id");
        expect(body.photo).toHaveProperty("title");
        expect(body.photo).toHaveProperty("caption");
        expect(body.photo).toHaveProperty("poster_image_url");
    });
    it("11. Success 200 - PhotoId 3 Found (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/${photoId3}`)
            .set("token", token)
            .send({
            title: `<src>while(true) { alert('Your account is being hacked') }</src>`,
            caption: `<src>console.log(__dirname)</src>`,
            poster_image_url: "http://www.Non-consectetur-a-erat-nam-at-Ut-lectus-arcu-bibendum.co.id/Non-consectetur-a-erat-nam-at-Ut-lectus-arcu-bibendum.co.id/at-varius-Tempor-commodo-ullamcorper-a-lacus-vestibulum-sed-arcu-non/image.pdf"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photo");
        expect(body.photo).toHaveProperty("id");
        expect(body.photo).toHaveProperty("title");
        expect(body.photo).toHaveProperty("caption");
        expect(body.photo).toHaveProperty("poster_image_url");
    });
    it("12. Success 200 - PhotoId 4 Found (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/${photoId4}`)
            .set("token", token)
            .send({
            title: `<src>while(true) { alert('Your account is being hacked') }</src>`,
            caption: `<src>console.log(__dirname)</src>`,
            poster_image_url: "http://www.Non-consectetur-a-erat-nam-at-Ut-lectus-arcu-bibendum.co.id/Non-consectetur-a-erat-nam-at-Ut-lectus-arcu-bibendum.co.id/at-varius-Tempor-commodo-ullamcorper-a-lacus-vestibulum-sed-arcu-non/image.pdf"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photo");
        expect(body.photo).toHaveProperty("id");
        expect(body.photo).toHaveProperty("title");
        expect(body.photo).toHaveProperty("caption");
        expect(body.photo).toHaveProperty("poster_image_url");
    });
    it("13. Success 200 - PhotoId 5 Found (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .put(`${photoApiUrl}/${photoId5}`)
            .set("token", token)
            .send({
            title: `<src>while(true) { alert('Your account is being hacked') }</src>`,
            caption: `<src>while(true) { window.location.reload(); }</src>`,
            poster_image_url: "http://www.Non-consectetur-a-erat-nam-at-Ut-lectus-arcu-bibendum.co.id/Non-consectetur-a-erat-nam-at-Ut-lectus-arcu-bibendum.co.id/at-varius-Tempor-commodo-ullamcorper-a-lacus-vestibulum-sed-arcu-non/image.pdf"
        });
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("photo");
        expect(body.photo).toHaveProperty("id");
        expect(body.photo).toHaveProperty("title");
        expect(body.photo).toHaveProperty("caption");
        expect(body.photo).toHaveProperty("poster_image_url");
    });
});
describe("DELETE /api/photos/:id", () => {
    it("0. Error 500 - Jwt Malformed", async () => {
        const { statusCode, body } = await supertest(server)
            .put(`${photoApiUrl}/1`)
            .set("token", "token");
        expect(statusCode).toBe(500);
        expect(body).toHaveProperty("err");
        expect(body.err).toHaveProperty("message", "jwt malformed");
        expect(body.err).toHaveProperty("name", "JsonWebTokenError");
    });
    it("1. Error 403 - authentication failed", async () => {
        const { body, statusCode } = await supertest(server).delete(`${photoApiUrl}/1`);
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Authentication Failed");
    });
    it("2. Success 200 - photoId1 with user in token payload exists (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${photoId1}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your photo has been successfully deleted");
    });
    it("3. Error 404 - Photo with UserId in token payload does not exists (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${1000}`)
            .set("token", token);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Photo does not found");
    });
    it("4. Error 404 - Photo with UserId in token payload does not exists (search by UserId and PhotoId) (2)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${photoId2}`)
            .set("token", anotherToken);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Photo does not found");
    });
    it("5. Error 404 - after case #2 photo with userId in payload does not found", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${photoId1}`)
            .set("token", token);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Photo does not found");
    });
    it("6. Error 400 - invalid photoId params", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/[ini-id]`)
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("photoId", ["Invalid Photo Id"]);
    });
    it("7. Error 400 - invalid photoId params (2)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${-2}`)
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("photoId", ["Invalid Photo Id"]);
    });
    it("8. Error 400 - invalid photoId params (3)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${2.15}`)
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("photoId", ["Invalid Photo Id"]);
    });
    it("9. Error 400 - invalid photoId params (4)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${Infinity}`)
            .set("token", token);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty("errors");
        expect(body.errors).toHaveProperty("photoId", ["Invalid Photo Id"]);
    });
    it("10. Success 200 - photoId2 with user in token payload exists (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${photoId2}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your photo has been successfully deleted");
    });
    it("11. Success 200 - photoId3 with user in token payload exists (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${photoId3}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your photo has been successfully deleted");
    });
    it("12. Success 200 - photoId4 with user in token payload exists (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${photoId4}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your photo has been successfully deleted");
    });
    it("13. Success 200 - photoId5 with user in token payload exists (search by UserId and PhotoId)", async () => {
        const { body, statusCode } = await supertest(server)
            .delete(`${photoApiUrl}/${photoId5}`)
            .set("token", token);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("Your photo has been successfully deleted");
    });
});
//# sourceMappingURL=photo.api.test.js.map