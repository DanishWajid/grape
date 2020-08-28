import http from "./httpService";

const loginEndpoint = "/user/login";
const logoutEndpoint = "/user/logout";

export function login(email, password) {
  return http.post(loginEndpoint, { email, password });
}

export function logout() {
  return http.post(logoutEndpoint);
}

export default {
  login,
  logout
};
