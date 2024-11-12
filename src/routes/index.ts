import type { ElysiaApp } from "..";

export default (app: ElysiaApp) =>
  app.get("/", () => Bun.file("./dist/index.html"));
