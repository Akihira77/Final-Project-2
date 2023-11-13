import { PORT } from "./config/config.js";
import { startServer } from "./utils/server.js";
const app = await startServer();
const port = Number(PORT || 7000);
app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});
//# sourceMappingURL=index.js.map