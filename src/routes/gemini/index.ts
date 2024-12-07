import { Elysia, t } from "elysia";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ElysiaApp } from "../..";

import { output } from "../../lib/data";
import { handleApikey } from "../../lib/apikey";

const apikey: any = process.env.GEMINI;
const genAI = new GoogleGenerativeAI(apikey);

export default (app: ElysiaApp) =>
  app
    .onError((error) => {
      console.error(error);
    })
    .post(
      "/",
      async ({
        query: { prompt, key },
      }: {
        query: { prompt: string; key: string };
      }) => {
        if (!prompt) return { error: "Prompt is missing" };
        if (!key) return { error: "Key is missing" };

        try {
          const apikey = await handleApikey(key);

          if (!apikey) return { error: "Apikey invalid" };
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const ans = await model.generateContent(prompt);

          return {
            endpoint: "/gemini",
            ...output,
            result: ans.response.text(),
          };
        } catch (err: any) {
          return { error: err.message };
        }
      },
      {
        query: t.Object({
          prompt: t.String(),
          key: t.String(),
        }),
      }
    );
