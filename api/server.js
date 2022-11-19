import fallback from "express-history-api-fallback";
import express from "express";
import { fileURLToPath} from "url";
import { join, dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, "..", "dist");

app.use(express.static(root));
app.use(fallback("index.html", { root }));
app.listen(3000, () => console.log("SERVER RUNNING AT PORT 3000"));
