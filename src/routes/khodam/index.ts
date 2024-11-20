import type { ElysiaApp } from "../..";
import { output } from "../../lib/data";

const khodam = {
  one: [
    "Agus",
    "Mulyono",
    "Badak",
    "Kominfo",
    "Asli",
    "Kucing",
    "Singa",
    "Kura-Kura",
    "Yulius",
    "Ahok",
  ],
  two: ["Mewing", "Sigma", "Gyat", "Gacor"],
};

export default (app: ElysiaApp) =>
  app.get("/", () => {
    return {
      endpoint: "/khodam",
      ...output,
      result: `${khodam.one[Math.floor(Math.random() * khodam.one.length)]} ${
        khodam.two[Math.floor(Math.random() * khodam.two.length)]
      }`,
    };
  });
