import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { helmet } from "elysia-helmet";
import { cors } from "@elysiajs/cors";
import { autoroutes } from "elysia-autoroutes";

const app = new Elysia()
  .use(cors())
  .use(
    autoroutes({
      routesDir: "./routes",
    })
  )
  .use(helmet())
  .use(staticPlugin({ prefix: "", assets: "dist" }))
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type ElysiaApp = typeof app;
