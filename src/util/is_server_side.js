export function isServerSide() {
  return typeof window === 'undefined';
}

export default isServerSide;
