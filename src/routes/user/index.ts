import type { ElysiaApp } from "../..";
import { handleApikey } from "../../lib/apikey";
import { CloseDB, OpenDB } from "../../lib/connection";
import { output } from "../../lib/data";
import Account from "../../models/account";

interface Usr {
  name: string;
  userID: string | null;
  status: string | null;
  image: string;
}

export default (app: ElysiaApp) =>
  app.get("/", async ({ query }: { query: { key: string } }) => {
    const key = query?.key;

    if (!key) return { error: "Missing key" };
    try {
      await OpenDB();

      const apikey = await handleApikey(key, false);
      if (!apikey) return { error: "Apikey not found or invalid" };

      const users = await Account.find({});

      const parsedUsers: Usr[] = users.map((e) => {
        return {
          name: e.name,
          userID: e.userID,
          status: e.status,
          image: e.image,
        };
      });

      return {
        endpoint: "/user",
        ...output,
        data: parsedUsers,
      };
    } catch (error: Error | any) {
      const { message } = error;
      return {
        error: "Error to get users",
        message,
      };
    } finally {
      await CloseDB();
    }
  });
