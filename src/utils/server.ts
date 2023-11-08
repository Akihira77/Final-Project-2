import { StatusCodes } from "./constants.js";
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import userEndpoints from "../api/users/endpoints.js";
import commentEndpoints from "../api/comments/endpoints.js";
import { ErrorHandlerMiddleware } from "../api/middlewares/error-handler.middleware.js";
import photoEndpoints from "../api/photos/endpoints.js";
import authMiddleware from "../api/middlewares/auth.middleware.js";

export const startServer = () => {
	const app = express();

	// Middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(morgan("dev"));
	app.use(cors());

	// Routes
	app.use("/api/users", userEndpoints);
	app.use("/api/photos", authMiddleware, photoEndpoints);
	app.use("/api/comments", authMiddleware, commentEndpoints);

	app.all("*", (req, res) => {
		res.status(StatusCodes.NotFound404).send({
			msg: "Route does not match anything",
		});
		return;
	});

	//Error Handler
	app.use(ErrorHandlerMiddleware);

	return app;
};
