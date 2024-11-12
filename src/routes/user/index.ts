import type { ElysiaApp } from "../..";
import { handleApikey } from "../../lib/apikey";
import { CloseDB, OpenDB } from "../../lib/connection";
import { output } from "../../lib/data";
import Account from "../../models/account";

export default (app: ElysiaApp) =>
  app.get("/", async ({ query }: { query: { key: string } }) => {
    const key = query?.key;

    if (!key) return { error: "Missing key" };
    try {
      await OpenDB();

      const apikey = await handleApikey(key);
      if (!apikey) return { error: "Apikey not found" };

      const users = await Account.find({});

      return {
        endpoint: "/user",
        ...output,
        data: users,
      };
    } catch (error) {
      return {
        error,
      };
    } finally {
      await CloseDB();
    }
  });