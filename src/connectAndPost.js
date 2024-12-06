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
import { getBipPosts } from "./getBipPosts.js";

dotenv.config();

export const run = async () => {
  const agent = await authenticateAgent();

  const posts = await getBipPosts(agent);
  console.log(posts);

  //need to do an efficient ranking on top posts with likes, reposts, and replies

  // await agent.post({
  //   text: `${text}`,
  //   createdAt: new Date().toISOString(),
  // });
  // console.log("Post posted successfully!");
};

run().catch(console.error);
