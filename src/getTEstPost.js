export const getTestPost = async (agent) => {
  console.log("starting");
  let cursor = null;
  let allPosts = [];
  do {
    const response = await agent.api.app.bsky.feed.searchPosts({
      q: "#justatestpostonafridaynight", // Query for the hashtag
      limit: 100, // Optional: Limit the number of posts per request
      cursor: cursor ? cursor : "", // Pass the cursor if present
      // since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    });

    // Collect posts from the current response
    allPosts = allPosts.concat(response.data.posts);

    // Update the cursor for the next request
    cursor = response.data.cursor;
    console.log("CURSOR", cursor);
  } while (cursor); // Continue while a cursor is present

  console.log("complete");
  return allPosts;
};
