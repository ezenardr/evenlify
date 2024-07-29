export default function truncateWords(str: string, maxChars = 80) {
  // Check if the string length is greater than maxChars
  if (str.length > maxChars) {
    // Truncate the string to the first maxChars characters and add "..." to the end
    return str.slice(0, maxChars) + "...";
  }

  // If the string has fewer characters than maxChars, return it as is
  return str;
}
