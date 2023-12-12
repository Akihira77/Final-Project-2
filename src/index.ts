import { PORT } from "./config/config.js";
import { startServer } from "./server.js";

const app = startServer();
const port = Number(PORT || 7000);

app.listen(port, () => {
	console.log(`Server is listening to port ${port}`);
});
