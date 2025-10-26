export const getTitleCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export const capitalizeName = (name: string) => {
  const words = name.split('-');
  const capitalizedWords = words.map(word => word[0].toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
};
