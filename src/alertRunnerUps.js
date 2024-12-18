import fetch, { Headers, Response, Request } from "node-fetch"; // Polyfill fetch, Headers, Response, and Request
import { FormData } from "formdata-node"; // Polyfill FormData

// Polyfill fetch, Headers, FormData, Request, and Response for the Node.js environment
globalThis.Headers = Headers;
globalThis.fetch = fetch;
globalThis.FormData = FormData;
globalThis.Response = Response;
globalThis.Request = Request;

import { RichText } from "@atproto/api";

export const alertRunnerups = async (agent, runnerUps) => {
  const likePostRunnerUps = runnerUps.likePosts.posts;
  const repostPostRunnerUps = runnerUps.repostPosts.posts;
  const replyPostRunnerUps = runnerUps.replyPosts.posts;

  const groupedRunnerUps = new Map();

  // Helper to group posts by author
  const groupByAuthor = (category, post, count, metric) => {
    const key = post.author.handle;
    if (!groupedRunnerUps.has(key)) {
      groupedRunnerUps.set(key, {
        author: post.author,
        posts: [],
      });
    }
    groupedRunnerUps.get(key).posts.push({
      category,
      post,
      count,
      metric,
    });
  };

  // Group posts by author
  for (const post of likePostRunnerUps) {
    groupByAuthor("liked", post, post.likeCount, "likes");
  }
  for (const post of repostPostRunnerUps) {
    groupByAuthor(
      "reposted",
      post,
      post.repostCount + post.quoteCount,
      "reposts"
    );
  }
  for (const post of replyPostRunnerUps) {
    groupByAuthor("replied", post, post.replyCount, "replies");
  }

  // Send replies to authors
  for (const [handle, { author, posts }] of groupedRunnerUps.entries()) {
    // Like each post if not already liked
    for (const { post } of posts) {
      if (!post.viewer.like) {
        console.log(`Liking post: ${post.uri}`);
        try {
          const { uri } = await agent.like(post.uri, post.cid);
          console.log(
            `Successfully liked post: ${post.uri} by ${author}: ${post.record.text}`
          );
        } catch (error) {
          console.error(`Failed to like post ${post.uri}:`, error);
        }
      } else {
        console.log(`Already liked post: ${post.uri}`);
      }
    }

    // Construct a single reply message for all categories
    const categories = posts
      .map(
        // ({ category, count, metric }) => `most ${category} (${count} ${metric})`
        ({ category, count, metric }) => `most ${category} (${count})`
      )
      .join(" & ");

    const replyText = `Hey @${author.handle}👋,\n\nThis post was a runner-up for a top #buildinpublic posts for the past 24hrs. You almost got ${categories}!\n\nSee who had the top posts on our feed @biptopposts.bsky.social. Keep up the great work!🎉`;

    // console.log(replyText);

    const reply = new RichText({
      text: replyText,
    });

    await reply.detectFacets(agent);

    // Reply to the first post in the group
    const firstPost = posts[0].post;
    await agent.post({
      type: "app.bsky.feed.post",
      text: reply.text,
      facets: reply.facets,
      createdAt: new Date().toISOString(),
      reply: {
        root: {
          uri: firstPost.uri,
          cid: firstPost.cid,
        },
        parent: {
          uri: firstPost.uri,
          cid: firstPost.cid,
        },
      },
    });

    console.log(`Posted reply to runner-up ${author.handle}`);
  }
};
