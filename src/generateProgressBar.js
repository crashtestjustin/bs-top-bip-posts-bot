export function generateYearProgressBar() {
  const totalWeeks = 52;
  const currentWeek =
    Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 1)) /
        (7 * 24 * 60 * 60 * 1000)
    ) + 1;
  const progressPercentage = (currentWeek / totalWeeks) * 100;

  const barLength = 12; // Emoji bar length
  const filledLength = Math.round((progressPercentage / 100) * barLength);
  const emptyLength = barLength - filledLength;

  const progressBar = `🟩`.repeat(filledLength) + `⬜`.repeat(emptyLength);

  return `Year Progress: ${currentWeek}/${totalWeeks} weeks (${progressPercentage.toFixed(
    1
  )}%)\n${progressBar}`;
}

// console.log(generateYearProgressBar());
