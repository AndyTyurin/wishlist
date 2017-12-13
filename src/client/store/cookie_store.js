function getCookie(name) {
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  return match && match[1];
}

function addCookie(name, value) {
  document.cookie = `${name}${value}`;
}

export const cookieStore = {
  getCookie,
  addCookie
};

export default cookieStore;
