import type { ElysiaApp } from "../..";
import { CreateApikey } from "../../lib/apikey";
import { CloseDB, OpenDB } from "../../lib/connection";

export default (app: ElysiaApp) =>
  app.post("/create", async ({ query }: { query: { name: string } }) => {
    const name: string | undefined = query?.name;

    try {
      await OpenDB();

      return await CreateApikey(name);
    } catch (error) {
      return { error: "Error on creating new Apikey" };
    } finally {
      await CloseDB();
    }
  });
