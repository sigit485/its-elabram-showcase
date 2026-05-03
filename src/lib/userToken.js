export function getUserToken() {
  let token = localStorage.getItem('its_user_token');
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem('its_user_token', token);
  }
  return token;
}
