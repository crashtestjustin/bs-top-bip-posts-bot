export const getRunnerUpPosts = async (posts, numberOfRunnerUps) => {
  const initializeRunnerUps = () => Array(numberOfRunnerUps).fill(null); // Array of nulls for the runner-up slots

  let runnerUpLikes = initializeRunnerUps();
  let runnerUpReposts = initializeRunnerUps();
  let runnerUpReplies = initializeRunnerUps();

  for (const post of posts) {
    // Check likes
    if (post.likeCount !== undefined) {
      for (let i = 0; i < numberOfRunnerUps; i++) {
        if (
          !runnerUpLikes[i] ||
          post.likeCount > runnerUpLikes[i]?.likeCount ||
          0
        ) {
          runnerUpLikes.splice(i, 0, post); // Insert post at current position
          runnerUpLikes = runnerUpLikes.slice(0, numberOfRunnerUps); // Keep array length consistent
          break;
        }
      }
    }

    // Check reposts (repostCount + quoteCount)
    const repostCount = (post.repostCount || 0) + (post.quoteCount || 0);
    if (repostCount > 0) {
      for (let i = 0; i < numberOfRunnerUps; i++) {
        if (
          !runnerUpReposts[i] ||
          repostCount >
            (runnerUpReposts[i]?.repostCount || 0) +
              (runnerUpReposts[i]?.quoteCount || 0)
        ) {
          runnerUpReposts.splice(i, 0, post);
          runnerUpReposts = runnerUpReposts.slice(0, numberOfRunnerUps);
          break;
        }
      }
    }

    // Check replies
    if (post.replyCount !== undefined) {
      for (let i = 0; i < numberOfRunnerUps; i++) {
        if (
          !runnerUpReplies[i] ||
          post.replyCount > runnerUpReplies[i]?.replyCount ||
          0
        ) {
          runnerUpReplies.splice(i, 0, post);
          runnerUpReplies = runnerUpReplies.slice(0, numberOfRunnerUps);
          break;
        }
      }
    }
  }

  const result = {
    likePosts: {
      posts: runnerUpLikes,
      type: "likes",
    },
    repostPosts: {
      posts: runnerUpReposts,
      type: "reposts",
    },
    replyPosts: {
      posts: runnerUpReplies,
      type: "replies",
    },
  };

  //   console.log(JSON.stringify(result, null, 2));

  return result;
};
