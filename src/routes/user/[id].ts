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
  app.get(
    "/",
    async ({
      params,
      query,
    }: {
      params: { id: string };
      query: { key: string };
    }) => {
      const id = params?.id || "";
      const key = query?.key || "";

      if (!key) return { error: "Missing key" };
      if (!id) return { error: "Missing id" };

      try {
        await OpenDB();

        const apikey = await handleApikey(key, false);

        if (!apikey) return { error: "Apikey not found" };
        const user: Usr[] | any = await Account.find({ userID: id });

        const { name, status, image, userID } = user[0];

        return {
          endpoint: "/user",
          ...output,
          data: {
            name,
            userID,
            status,
            image,
          },
        };
      } catch (error: Error | any) {
        return {
          error: "Error on handle user",
          message: error.message,
        };
      } finally {
        await CloseDB();
      }
    }
  );
