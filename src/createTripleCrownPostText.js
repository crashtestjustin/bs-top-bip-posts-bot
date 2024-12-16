import { RichText } from "@atproto/api";

export const tripleCrownText = async (category, post, count, metric) => {
  const announcement = new RichText({
    text: `🏆${category}👑 winner! @${post.mostLiked.author.handle} with the most liked, reposted, & replied to post in #BuildInPublic (Last 24 Hours):\n\n- Author: @${post.mostLiked.author.handle}\n- ${post.mostLiked.likeCount} likes\n- ${post.mostReplied.replyCount} replies\n- ${post.mostReposted.repostCount} reposts\n\nCongrats @${post.mostLiked.author.handle}! 🎉 Keep up the great work!`,
  });

  return announcement;
};
