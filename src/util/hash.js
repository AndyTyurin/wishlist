export function hash(text) {
  let hash = 0;
  let chr;
  if (text.length === 0) return hash;
  for (let i = 0; i < text.length; i += 1) {
    chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash < 0 ? hash * -1 : hash;
}

export default hash;
