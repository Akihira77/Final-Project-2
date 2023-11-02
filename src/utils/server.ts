import { StatusCodes } from "./constants.js";
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";

export const startServer = () => {
	const app = express();

	// Middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(morgan("dev"));
	app.use(cors());

	// Routes
	app.all("*", (req, res) => {
		res.status(StatusCodes.NotFound404).send({
			msg: "Route does not match anything",
		});
		return;
	});

	//Error Handler

	return app;
};

