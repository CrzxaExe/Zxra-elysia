import Elysia from "elysia";
import { output } from "../../lib/data";
import mks from "./../../../package.json";

const Performance = new Elysia().get("/performance", () => {
  try {
    return {
      endpoint: "/performance",
      ...output,
      data: {
        elysia: mks.dependencies["@elysiajs/static"],
        uptime: process.uptime(),
        version: process.version,
        memory: process.memoryUsage(),
        platform: process.platform,
      },
    };
  } catch (err: any) {
    return { error: err.message };
  }
});

export default Performance;
