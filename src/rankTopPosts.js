export const rankTopPosts = (posts) => {
  if (!Array.isArray(posts) || posts.length === 0) {
    throw new Error("Invalid posts array.");
  }

  let topLikes = null;
  let topReposts = null;
  let topReplies = null;

  for (const post of posts) {
    if (!post) continue;

    // Calculate total reposts (reposts + quotes)
    const totalReposts = (post.repostCount || 0) + (post.quoteCount || 0);

    // Check likes
    if (!topLikes || (post.likeCount || 0) > (topLikes.likeCount || 0)) {
      topLikes = post;
    }

    // Check reposts (including quotes)
    if (
      !topReposts ||
      totalReposts >
        (topReposts.repostCount || 0) + (topReposts.quoteCount || 0)
    ) {
      topReposts = post;
    }

    // Check replies
    if (!topReplies || (post.replyCount || 0) > (topReplies.replyCount || 0)) {
      topReplies = post;
    }
  }

  return {
    mostLiked: topLikes,
    mostReposted: topReposts,
    mostReplied: topReplies,
  };
};