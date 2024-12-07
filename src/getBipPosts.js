export const getBipPosts = async (agent) => {
  let allPosts = [];
  let cursor = null;
  do {
    const response = await agent.api.app.bsky.feed.searchPosts({
      q: "#buildinpublic", // Query for the hashtag
      limit: 100, // Optional: Limit the number of posts per request
      cursor: cursor ? cursor : "", // Pass the cursor if present
      since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    });

    // Collect posts from the current response
    allPosts = allPosts.concat(response.data.posts);

    // Update the cursor for the next request
    cursor = response.data.cursor;
  } while (cursor); // Continue while a cursor is present
  return allPosts;
};
