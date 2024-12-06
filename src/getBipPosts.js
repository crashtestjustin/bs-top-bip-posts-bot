export const getBipPosts = async (agent) => {
  const posts = await agent.app.bsky.feed.getPosts();

  return posts;
};
