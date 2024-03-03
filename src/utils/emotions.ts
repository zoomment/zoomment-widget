export const parseEmotions = str => {
  if (!str) return [];

  const array = String(str).split(',');
  const set = new Set(array.filter(Boolean));

  return Array.from(set);
};
