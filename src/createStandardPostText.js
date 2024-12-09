import { RichText } from "@atproto/api";

export const standardWinnersPost = async (category, post, count, metric) => {
  if (!post || !post.uri || !post.author?.handle) return;

  const announcement = new RichText({
    text: `🏆 Top ${category} Post in #BuildInPublic (Last 24 Hours):
      - By: @${post.author.handle}
      - ${count} ${metric}
      
      Congrats! 🎉 Keep up the great work!
      `,
  });

  return announcement;
};
