function get(name) {
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  return match && match[1];
}

function set(name, value) {
  document.cookie = `${name}=${value}`;
}

export const cookieStore = {
  set,
  get
};

export default cookieStore;
