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
import { rankTopPosts } from "./rankTopPosts.js";
import { RichText } from "@atproto/api";

dotenv.config();

export const run = async () => {
  const agent = await authenticateAgent();

  const posts = await getBipPosts(agent);
  const topPosts = rankTopPosts(posts);
  console.log(topPosts);

  // Post announcements for each winner
  const postWinners = async (category, post, count, metric) => {
    if (!post || !post.uri || !post.author?.handle) return;

    const announcement = new RichText({
      text: `🏆 Top ${category} Post in #BuildInPublic (Last 24 Hours):
      - By: @${post.author.handle}
      - ${count} ${metric}
      
      Congrats! 🎉 Keep up the great work!
      `,
    });
    await announcement.detectFacets(agent);
    // Post the announcement quoting the winner's post
    await agent.post({
      type: "app.bsky.feed.post",
      text: announcement.text,
      facets: announcement.facets,
      createdAt: new Date().toISOString(),
      embed: {
        $type: "app.bsky.embed.record",
        record: {
          uri: post.uri,
          cid: post.cid,
        },
      },
    });
    console.log(`Posted top ${category} post: @${post.author.handle}`);
  };

  // Post each winner
  await postWinners(
    "Liked",
    topPosts.mostLiked,
    topPosts.mostLiked?.likeCount || 0,
    "likes"
  );
  await postWinners(
    "Reposted (including quote posts)",
    topPosts.mostReposted,
    (topPosts.mostReposted?.repostCount || 0) +
      (topPosts.mostReposted?.quoteCount || 0),
    "reposts"
  );
  await postWinners(
    "Replied",
    topPosts.mostReplied,
    topPosts.mostReplied?.replyCount || 0,
    "replies"
  );

  console.log("All top posts announced!");
};

run().catch(console.error);
