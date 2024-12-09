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
import { standardWinnersPost } from "./createStandardPostText.js";
import { tripleCrownText } from "./createTripleCrownPostText.js";
import { getTestPost } from "./getTEstPost.js";

dotenv.config();

export const run = async () => {
  const agent = await authenticateAgent();

  const posts = await getBipPosts(agent);
  // const posts = await getTestPost(agent);
  const topPosts = rankTopPosts(posts);
  // console.log(topPosts);

  // Post announcements for each winner
  const postWinners = async (category, post, count, metric) => {
    let announcement;
    const tripleCrownTrue = category === "Triple Crown";
    if (tripleCrownTrue) {
      announcement = await tripleCrownText(category, post, count, metric);
    } else {
      announcement = await standardWinnersPost(category, post, count, metric);
    }

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
          uri: tripleCrownTrue ? post.mostLiked.uri : post.uri,
          cid: tripleCrownTrue ? post.mostLiked.cid : post.cid,
        },
      },
    });
    console.log(
      `Posted top ${category} post: ${
        tripleCrownTrue
          ? `@${post.mostLiked.author.handle}`
          : `@${post.author.handle}`
      }`
    );
  };

  const winnderHandles = [
    topPosts.mostLiked.author.handle,
    topPosts.mostReposted.author.handle,
    topPosts.mostReplied.author.handle,
  ];

  if (winnderHandles.every((handle) => handle === winnderHandles[0])) {
    await postWinners("Triple Crown", topPosts, null, {
      likes: "likes",
      reposts: "reposts",
      replies: "replies",
    });
  } else {
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
  }

  console.log("All top posts announced!");
};

run().catch(console.error);
