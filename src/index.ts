import { PORT } from "./config/config.js";
import { sequelize } from "./db/db.js";
import { startServer } from "./utils/server.js";

const app = startServer();
const port = Number(PORT || 7000);

sequelize.sync({ benchmark: true, alter: false, force: false }).then(() => {
	app.listen(port, () => {
		console.log(`Server is listening to port ${port}`);
	});
});
