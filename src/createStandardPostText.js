import { RichText } from "@atproto/api";

export const standardWinnersPost = async (category, post, count, metric) => {
  if (!post || !post.uri || !post.author?.handle) return;

  const announcement = new RichText({
    text: `🏆 Top ${category} Post in #BuildInPublic (Last 24 Hours):\n\n- By: @${
      post.author.handle
    }\n- ${count} ${metric}\n\n${
      category === "Liked"
        ? "People really like what you're posting!👍"
        : category === "Reposted (including quote posts)"
        ? "You post is clearly share-worthy!💌"
        : "You post is engaging the community!🎉"
    }`,
  });

  return announcement;
};

// Congrats! 🎉 Keep up the great work!
