import { RichText } from "@atproto/api";

export const tripleCrownText = async (category, post, count, metric) => {
  const announcement = new RichText({
    text: `🏆${category}👑 winner! @${post.mostLiked.author.handle} with the most liked, reposted, and replied to post in #BuildInPublic (Last 24 Hours):
        - Author: @${post.mostLiked.author.handle}
        - ${post.mostLiked.likeCount} likes
        - ${post.mostReplied.replyCount} replies
        - ${post.mostReposted.repostCount} reposts
        
        Congrats @${post.mostLiked.author.handle}! 🎉 Keep up the great work!
        `,
  });

  return announcement;
};
