import { Elysia, t } from "elysia";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { output } from "../../lib/data";

const apikey: any = process.env.GEMINI;
const genAI = new GoogleGenerativeAI(apikey);

const gemini = new Elysia()
  .onError((error) => {
    console.log(error);
  })
  .post(
    "/gemini",
    async ({ query: { prompt } }) => {
      try {
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
      }),
    }
  );

export default gemini;
