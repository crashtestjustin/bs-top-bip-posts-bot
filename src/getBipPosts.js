export const getBipPosts = async (agent) => {
  let allPosts = [];
  let cursor = null;
  console.log("starting");
  do {
    const response = await agent.api.app.bsky.feed.searchPosts({
      q: "#buildinpublic", // Query for the hashtag
      limit: 25, // Optional: Limit the number of posts per request
      cursor: cursor ? cursor : "", // Pass the cursor if present
      since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    });

    // Collect posts from the current response
    allPosts = allPosts.concat(response.data.posts);

    // Update the cursor for the next request
    cursor = response.data.cursor;
  } while (cursor > 23); // Continue while a cursor is present

  console.log("complete");
  return allPosts;
};
