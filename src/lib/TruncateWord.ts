export default function truncateWords(str: string, maxWords = 15) {
  // Split the string into words
  const words = str.split(" ");

  // Check if the number of words is greater than maxWords
  if (words.length > maxWords) {
    // Truncate the words array to the first maxWords elements and join them back into a string
    return words.slice(0, maxWords).join(" ") + "...";
  }

  // If the string has fewer words than maxWords, return it as is
  return str;
}
