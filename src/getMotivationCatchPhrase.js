const catchphrases = [
  "Keep pushing forward! Every week is a new opportunity to make progress toward your goals. Let's keep the momentum going!",
  "Keep up the hard work!",
  "The journey continues! Every week brings us closer to where we want to be. Stay focused and keep moving forward.",
  "What goals are you focusing on this week? Let’s make the most of the time we have and keep making progress!",
  "Let’s set some new goals for the upcoming week. What will you accomplish next?",
  "Think about how you can keep building on this progress in the coming weeks. The best is yet to come!",
  "Let’s keep up the great progress and make the most of the year.",
  "Your effort and commitment are paying off. Let’s continue pushing towards even greater achievements!",
  "Here’s to another week of progress and success!",
  "Let’s continue the momentum. Keep up the great work!",
  "The year is moving quickly—let's stay focused and keep making progress!",
  "Another week, another chance to make progress. Keep it going!",
  "Progress, not perfection.",
  "Every step forward is a step toward your goal.",
  "Make today count, and tomorrow will take care of itself.",
  "Success is built on consistency and hard work.",
  "Keep going, because you’re closer than you think.",
  "Your future is created by what you do today, not tomorrow.",
  "One day at a time, one step at a time, keep moving forward.",
  "The journey is just as important as the destination.",
  "Believe in yourself and all that you are. You’re capable of more than you know.",
  "Success isn’t about how fast you go, it’s about how far you’ve come.",
  "Strive for progress, not perfection.",
  "Don’t wait for the perfect moment—create it.",
  "Keep pushing, keep growing, keep learning.",
  "The only limit is the one you set for yourself.",
  "Your hard work will pay off. Keep going!",
  "Stay focused, stay determined, and watch your dreams unfold.",
  "Don’t stop when you're tired. Stop when you’re done.",
  "Small progress is still progress. Keep going!",
  "It’s never too late to make a change. Start now.",
  "The best way to predict the future is to create it.",
];

export const getRamdonCatchPhrase = () => {
  const index = Math.floor(Math.random() * catchphrases.length);
  return catchphrases[index];
};
