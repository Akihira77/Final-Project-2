import { afterAll, beforeAll, describe, expect, it, test } from "@jest/globals";
import { startServer } from "../src/server.js";
import { sequelize } from "../src/db/db.js";
import supertest from "supertest";

const server = startServer();
const commentApiUrl = "/api/comments";

type TComment = {

	comment: string;
	PhotoId: number;
};

const KComment: Record<keyof TComment, keyof TComment> = {

	comment: "comment",
	PhotoId: "PhotoId",
};

const comment: TComment = {
	comment: "Tes Comment",
	PhotoId: 1,
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

const photo = {
	title: "Test Photo",
	caption: "This is a test photo",
	poster_image_url: "http://example.com/testphoto.jpg",
};


let token = ""; 
let photoId = 0; 
let commentId1 = "";
let commentId2 = "";
let commentId3 = "";
let commentId4 = "";
let commentId5 = "";

beforeAll(async () => {
	await sequelize.sync({ force: true });
	await supertest(server).post("/api/users/register").send(user);
	const loginResponse = await supertest(server)
		.post("/api/users/login")
		.send({ email: user.email, password: user.password });
 
	 token = loginResponse.body.token;
	 console.log("TOKEN:", token)

	 // Tambahkan langkah untuk menambahkan foto baru
	const photoResponse = await supertest(server)
	 .post("/api/photos")
	 .send(photo)
	 .set("token", token);
 
	 photoId = photoResponse.body.id;
	 console.log("photoId:", photoId)

});

afterAll(async () => {
	await sequelize.sync({ force: true });
});

describe("POST api/comments", () => {
  const createCommentUrl = `${commentApiUrl}/`;

  it("0. Error 500 - Jwt Malformed", async () => {
	const { statusCode, body } = await supertest(server)
			.post(createCommentUrl)
			.set("token", "token")
        expect(statusCode).toBe(500);
		expect(body).toHaveProperty("err");
		expect(body.err).toHaveProperty("message", "jwt malformed");
		expect(body.err).toHaveProperty("name", "JsonWebTokenError");
  });

  it("1. Error 403 - Authentication Failed", async () => {
	const { body, statusCode } = await supertest(server)
		.post(commentApiUrl)
		.send(comment);

	expect(statusCode).toBe(403);
	expect(body).toHaveProperty("message", "Authentication Failed");
});


  it("2. Error 400 - Empty Request Body", async () => {
	const { body, statusCode } = await supertest(server)
		.post(commentApiUrl)
		.send(undefined)
		.set("token", token);

	expect(statusCode).toBe(400);
	expect(body).toHaveProperty("errors");
	expect(body.errors).toHaveProperty("comment", ["Required"]);
	expect(body.errors).toHaveProperty("PhotoId", ["Required"]);
   });	

     it("3. Error 400 - Invalid Request Body", async () => {
		const invalidCommentRequest = {
			comment: "",
			PhotoId: 0,
		};

   		const { body, statusCode } = await supertest(server)
			.post(createCommentUrl)
			.send(invalidCommentRequest)
			.set("token", token);

        expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("comment", ["Cannot be empty"]);
		expect(body.errors).toHaveProperty("PhotoId", ["Cannot be empty"]);
 	 });
	  
	 it("4. Error 400 - comment must be string", async () => {
		const { body, statusCode } = await supertest(server)
			.post(createCommentUrl)
			.send({
				comment: 12345,
				PhotoId: 1,
			})
			.set("token", token);

		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("comment", ["Must be a string"]);
	});

	it("5. Error 400 - PhotoId must be number", async () => {
		const { body, statusCode } = await supertest(server)
			.post(createCommentUrl)
			.send({
				comment: "Comment Tes",
				PhotoId: "1",
			})
			.set("token", token);

		// expect(body).toBe(11);
		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("PhotoId", ["Must be a number"]);
	});

	it("6. Success 201 - Comment Created Successfully", async () => {
		const { body, statusCode } = await supertest(server)
		  .post(commentApiUrl)
		  .send({
			comment: "Tes Comment",
			PhotoId: photoId, 
		  })
		  .set("token", token);
	  
		console.log("Response Body:", body);

		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("comment", "Tes Comment");
		expect(body).toHaveProperty("PhotoId", photoId);
		expect(body).toHaveProperty("UserId");
	  
		commentId1 = body.id;
	});

	it("7. Success 201 - Comment Created Successful (2)", async () => {
		const comment = {
			comment: "C0M3nt n!@#$%^&*bksbakd alah kapencet buost",
			PhotoId: photoId, 
		};

		const { body, statusCode } = await supertest(server)
			.post(commentApiUrl)
			.set("token", token)
			.send(comment);

		// expect(body).toBe(11);
		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("comment", comment.comment);
		expect(body).toHaveProperty("PhotoId", comment.PhotoId);
		expect(body).toHaveProperty("UserId");

		commentId2 = body.id;
	});
	it("8. Success 201 - Comment Created Successful (3)", async () => {
		const comment = {
			comment: "C0M3nt n!@#$%^&*bksbakd alah kapencet",
			PhotoId: photoId, 
		};

		const { body, statusCode } = await supertest(server)
			.post(commentApiUrl)
			.set("token", token)
			.send(comment);

		// expect(body).toBe(11);
		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("comment", comment.comment);
		expect(body).toHaveProperty("PhotoId", comment.PhotoId);
		expect(body).toHaveProperty("UserId");

		commentId3 = body.id;
	});

	it("9. Success 201 - Comment Created Successful (4)", async () => {
		const comment = {
			comment: "C0M3nt n!@#$%^&*bksbakd alah buos",
			PhotoId: photoId, 
		};

		const { body, statusCode } = await supertest(server)
			.post(commentApiUrl)
			.set("token", token)
			.send(comment);

		// expect(body).toBe(11);
		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("comment", comment.comment);
		expect(body).toHaveProperty("PhotoId", comment.PhotoId);
		expect(body).toHaveProperty("UserId");

		commentId4 = body.id;
	});

	it("10. Success 201 - Comment Created Successful (5)", async () => {
		const comment = {
			comment: "C0M3nt n!@#$%^&*bksbakd alah siah",
			PhotoId: photoId, 
		};

		const { body, statusCode } = await supertest(server)
			.post(commentApiUrl)
			.set("token", token)
			.send(comment);

		// expect(body).toBe(11);
		expect(statusCode).toBe(201);
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("comment", comment.comment);
		expect(body).toHaveProperty("PhotoId", comment.PhotoId);
		expect(body).toHaveProperty("UserId");

		commentId5 = body.id;
	});

	
});

let anotherToken = "";
describe("GET /api/comments", () => {
	type UserBody = {
		id: number;
		username: string;
	};
	type CommentBody = {
		comment: string;
		User: Omit<UserBody, "id">;
	};
	type ResponseBodyProperty = {
		comments: {
			id: number;
			comment: string;
			PhotoId: number;
			UserId: number;
			createdAt: string;
			updatedAt: string;
			User: UserBody;
		}[];
	};

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
			.get(`${commentApiUrl}/1`)
			.set("token", "token");

		// expect(body).toBe(11);
		expect(statusCode).toBe(500);
		expect(body).toHaveProperty("err");
		expect(body.err).toHaveProperty("message", "jwt malformed");
		expect(body.err).toHaveProperty("name", "JsonWebTokenError");
	});

	it("1. Error 403 - Authentication Failed", async () => {
		const { body, statusCode } = await supertest(server).get(commentApiUrl);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message", "Authentication Failed");
	});

	it("2. Error 404 - Missing CommentId", async () => {
		const { body, statusCode } = await supertest(server)
		  .get(`${commentApiUrl}/asdnakjdn`)
		  .set("token", token);
	
		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("msg", "Route does not match anything");
	  });

	  it("3. Error 404 - Invalid Limit Parameter", async () => {
		const invalidLimit = "invalid";
		const response = await supertest(server)
		  .get(`${commentApiUrl}/limit=${invalidLimit}`)
		  .set("token", token);
	  
		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("msg", "Route does not match anything");
	  });
	  
	  it("4. Error 404 - Invalid Page Parameter", async () => {
		const invalidPage = "invalid";
		const response = await supertest(server)
		  .get(`${commentApiUrl}/page=${invalidPage}`)
		  .set("token", token);
	  
		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty("msg", "Route does not match anything");
	  });

	it("5. Success 200 - Check Comment Structure", async () => {
		const response = await supertest(server)
		  .get(commentApiUrl)
		  .set("token", token);
	  
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("comments");
		expect(response.body.comments).toBeInstanceOf(Array);
	  
		if (response.body.comments.length > 0) {
		  const comment = response.body.comments[0];
		  expect(comment).toHaveProperty("id");
		  expect(comment).toHaveProperty("comment");
		  expect(comment).toHaveProperty("PhotoId");
		  expect(comment).toHaveProperty("UserId");
		  expect(comment).toHaveProperty("createdAt");
		  expect(comment).toHaveProperty("updatedAt");
		  expect(comment).toHaveProperty("User");
	  
		  const user = comment.User;
		  expect(user).toHaveProperty("id");
		  expect(user).toHaveProperty("username");
		}
	  });

	  it("6. Success 200 - Check Comment Pagination", async () => {
		const response = await supertest(server)
		  .get(`${commentApiUrl}?page=1&limit=5`)
		  .set("token", token);
	  
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("comments");
		expect(response.body.comments).toBeInstanceOf(Array);
		expect(response.body.comments.length).toBeLessThanOrEqual(5);
	  });

	  it("7. Success 200 - match property", async () => {
		const { body, statusCode } = await supertest(server)
			.get(commentApiUrl)
			.set("token", token);

		// expect(body).toBe(11);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("comments");
		(body as ResponseBodyProperty).comments.every((comment) => {
			expect(comment).toHaveProperty("id");
			expect(comment).toHaveProperty("comment");
			expect(comment).toHaveProperty("PhotoId");
			expect(comment).toHaveProperty("UserId");
			expect(comment).toHaveProperty("createdAt");
			expect(comment).toHaveProperty("updatedAt");
			expect(comment).toHaveProperty("User");
			expect(comment.User).toHaveProperty("id");
			expect(comment.User).toHaveProperty("username");
		});
	});

	it("8. Success 200 - Get All Comment", async () => {
        const { body, statusCode } = await supertest(server)
          .get(commentApiUrl)
          .set("token", token);
      
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("comments");
        expect(body.comments).toBeInstanceOf(Array);
      
        if (body.comments.length > 0) {
          const comment = body.comments[0];
          expect(comment).toHaveProperty("id");
          expect(comment).toHaveProperty("comment");
          expect(comment).toHaveProperty("PhotoId");
          expect(comment).toHaveProperty("UserId");
          expect(comment).toHaveProperty("createdAt");
          expect(comment).toHaveProperty("updatedAt");
          expect(comment).toHaveProperty("User");
          expect(comment.User).toHaveProperty("id");
          expect(comment.User).toHaveProperty("username");
        }
      });
	
});

describe("PUT /api/comments/:id", () => {
	it("0. Error 500 - Jwt Malformed", async () => {
		const { statusCode, body } = await supertest(server)
			.put(`${commentApiUrl}/1`)
			.set("token", "token");

		// expect(body).toBe(11);
		expect(statusCode).toBe(500);
		expect(body).toHaveProperty("err");
		expect(body.err).toHaveProperty("message", "jwt malformed");
		expect(body.err).toHaveProperty("name", "JsonWebTokenError");
	});

	it("1. Error 403 - Authentication Failed", async () => {
		const { statusCode, body } = await supertest(server).put(
			`${commentApiUrl}/1`
		);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message", "Authentication Failed");
	});
	it("2. Error 404 - Cant access other user's comment (search by UserId and CommentId)", async () => {
		const { statusCode, body } = await supertest(server)
			.put(`${commentApiUrl}/1`)
			.set("token", anotherToken)
			.send({
				comment: "",
				PhotoId: 0,
			});

		// expect(body).toBe(200);
		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message", "Comment does not found");
	});

	it("3. Error 404 - Comment Does Not Found (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/100`)
			.set("token", token)
			.send({
				comment: "comment baru",
				PhotoId: 1,
			});

		// expect(body).toBe(112);
		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message", "Comment does not found");
	});

	it("4. Error 400 - Invalid CommentId", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/{iuni_idnih=13}`)
			.set("token", token)
			.send({
				comment: "comment baru",
				PhotoId: photoId,
			});

		// expect(body).toBe(112);
		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("commentId", ["Invalid Comment Id"]);
	});

	it("5. Error 400 - Invalid PhotoId (2)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/${-12}`)
			.set("token", token)
			.send({
				comment: "comment baru",
				PhotoId: photoId,
			});

		// expect(body).toBe(112);
		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("commentId", ["Invalid Comment Id"]);
	});

	it("6. Error 400 - Invalid PhotoId (3)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/012`)
			.set("token", token)
			.send({
				comment: "comment baru",
				PhotoId: photoId,
			});

		// expect(body).toBe(112);
		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("commentId", ["Invalid Comment Id"]);
	});
	
	it("7. Error 400 - Invalid Request Body", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/12`)
			.set("token", token)
			.send({
				comment: 12121,
				PhotoId: "photoId",
			});

		// expect(body).toBe(112);
		expect(statusCode).toBe(400);
		expect(body).toHaveProperty("errors");
		expect(body.errors).toHaveProperty("comment", ["Expected string, received number"]);
	});

	it("8. Success 200 - CommentId 1 Found (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/${commentId1}`)
			.set("token", token)
			.send({
				comment: "comment baru bgt",
				PhotoId: photoId,
			});

		// expect(body).toBe(100);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("id");
		expect(body.comment).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("PhotoId");
	});

	it("9. Success 200 - CommentId 2 Found (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/${commentId2}`)
			.set("token", token)
			.send({
				comment: "comment baru bgt yang kedua",
				PhotoId: photoId,
			});

		// expect(body).toBe(100);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("id");
		expect(body.comment).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("PhotoId");
	});
	
	it("10. Success 200 - CommentId 3 Found (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/${commentId3}`)
			.set("token", token)
			.send({
				comment: "comment baru bgt yang ketiga",
				PhotoId: photoId,
			});

		// expect(body).toBe(100);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("id");
		expect(body.comment).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("PhotoId");
	});

	it("11. Success 200 - CommentId 4 Found (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/${commentId4}`)
			.set("token", token)
			.send({
				comment: "comment baru bgt yang Keempat",
				PhotoId: photoId,
			});

		// expect(body).toBe(100);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("id");
		expect(body.comment).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("PhotoId");
	});
	
	it("12. Success 200 - CommentId 5 Found (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.put(`${commentApiUrl}/${commentId4}`)
			.set("token", token)
			.send({
				comment: "comment baru bgt yang Kelima",
				PhotoId: photoId,
			});

		// expect(body).toBe(100);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("id");
		expect(body.comment).toHaveProperty("comment");
		expect(body.comment).toHaveProperty("PhotoId");
	});


	
});

describe("DELETE /api/comments/:id", () => {
	it("0. Error 500 - Jwt Malformed", async () => {
		const { statusCode, body } = await supertest(server)
			.put(`${commentApiUrl}/1`)
			.set("token", "token");

		// expect(body).toBe(11);
		expect(statusCode).toBe(500);
		expect(body).toHaveProperty("err");
		expect(body.err).toHaveProperty("message", "jwt malformed");
		expect(body.err).toHaveProperty("name", "JsonWebTokenError");
	});

	it("1. Error 403 - authentication failed", async () => {
		const { body, statusCode } = await supertest(server).delete(
			`${commentApiUrl}/1`
		);

		expect(statusCode).toBe(403);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Authentication Failed");
	});

	it("2. Error 404 - Comment with UserId in token payload does not exists (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${commentApiUrl}/${1000}`)
			.set("token", token);

		// expect(body).toBe(100);
		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Comment does not found / You Not Authorized");
	});

	it("3. Error 404 - Missing CommentId", async () => {
		const { body, statusCode } = await supertest(server)
		  .delete(`${commentApiUrl}/`)
		  .set("token", token);
	
		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("msg", "Route does not match anything");
	  });
	 
	  it("4. Error 404 - Comment not found (search by CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
		  .delete(`${commentApiUrl}/1234567890`)
		  .set("token", token);
	
		expect(statusCode).toBe(404);
		expect(body).toHaveProperty("message", "Comment does not found / You Not Authorized");
	  });
	
	  it("5. Success 200 - commentId1 with user in token payload exists (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${commentApiUrl}/${commentId1}`)
			.set("token", token);

		// expect(body).toBe(200);
		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your comment has been successfully deleted");
	});

	  it("6. Success 200 - commentId2 with user in token payload exists (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${commentApiUrl}/${commentId2}`)
			.set("token", token);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your comment has been successfully deleted");
	});
	  
	it("7. Success 200 - commentId3 with user in token payload exists (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${commentApiUrl}/${commentId3}`)
			.set("token", token);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your comment has been successfully deleted");
	});
	it("8. Success 200 - commentId4 with user in token payload exists (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${commentApiUrl}/${commentId4}`)
			.set("token", token);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your comment has been successfully deleted");
	});
	it("9. Success 200 - commentId5 with user in token payload exists (search by UserId and CommentId)", async () => {
		const { body, statusCode } = await supertest(server)
			.delete(`${commentApiUrl}/${commentId5}`)
			.set("token", token);

		expect(statusCode).toBe(200);
		expect(body).toHaveProperty("message");
		expect(body.message).toBe("Your comment has been successfully deleted");
	});
});
