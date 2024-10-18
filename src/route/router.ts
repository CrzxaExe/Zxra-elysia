import { Elysia } from "elysia";
import Performance from "./routers/performance";
import gemini from "./routers/gemini";

const router = new Elysia();

router.get("/", () => Bun.file("./dist/index.html"));
router.use(Performance);
router.use(gemini);

export default router;
