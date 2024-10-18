import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

import router from "./route/router";

const app = new Elysia()
  .use(router)
  .use(staticPlugin({ prefix: "", assets: "dist" }))
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
