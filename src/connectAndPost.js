import fetch, { Headers, Response, Request } from "node-fetch"; // Polyfill fetch, Headers, Response, and Request
import { FormData } from "formdata-node"; // Polyfill FormData

// Polyfill fetch, Headers, FormData, Request, and Response for the Node.js environment
globalThis.Headers = Headers;
globalThis.fetch = fetch;
globalThis.FormData = FormData;
globalThis.Response = Response;
globalThis.Request = Request;

import dotenv from "dotenv";
import cron from "node-cron";
import { authenticateAgent } from "./authenticateAgent.js";
import { generateYearProgressBar } from "./generateProgressBar.js";
import { getRamdonCatchPhrase } from "./getMotivationCatchPhrase.js";

dotenv.config();

export const run = async () => {
  const agent = await authenticateAgent();

  let text;
  const catchphrase = getRamdonCatchPhrase();

  const weeklyProgressText = generateYearProgressBar();
  text = `A new week begins! Here's how we're progressing through the year so far:\n\n${weeklyProgressText}\n\n${catchphrase}`;

  await agent.post({
    text: `${text}`,
    createdAt: new Date().toISOString(),
  });
  console.log("Post posted successfully!");
};

run().catch(console.error);
