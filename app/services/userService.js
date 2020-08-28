import http from "./httpService";

const apiEndpoint = "/user";

function urlGenerator(id) {
  return `${apiEndpoint}/${id}`;
}

export function register(user) {
  return http.post(apiEndpoint, user);
}

export function resetPasswordInitiate(email) {
  const endPoint = urlGenerator("reset/password/initiate");
  return http.post(endPoint, email);
}

export function resetPasswordVerifyCode(data, token) {
  const endPoint = urlGenerator("reset/password/verify/code");
  const headers = {
    "Content-Type": "application/json",
    token: token
  };
  return http.post(endPoint, data, { headers });
}

export function resetPassword(data, token) {
  const endPoint = urlGenerator("reset/password");
  const headers = {
    "Content-Type": "application/json",
    token: token
  };
  return http.post(endPoint, data, { headers });
}

export function getUser(id) {
  const params = {
    user_id: id
  };
  return http.get(apiEndpoint, { params });
}

export function getFeed(limit, offset) {
  const endPoint = urlGenerator("feed");

  const params = {
    limit: limit,
    offset: offset
  };
  return http.get(endPoint, { params });
}

export function getnotificationFeed(limit, offset) {
  const endPoint = urlGenerator("notification/feed");

  const params = {
    limit: limit,
    offset: offset
  };
  return http.get(endPoint, { params });
}

export function findFriends(username, limit, offset) {
  const endPoint = urlGenerator("search");

  const params = {
    username,
    limit: limit,
    offset: offset
  };
  return http.get(endPoint, { params });
}

export function getFollowers() {
  const endPoint = urlGenerator("followers");
  return http.get(endPoint);
}

export function getFollowing() {
  const endPoint = urlGenerator("following");
  return http.get(endPoint);
}

export function follow(followee_id) {
  const endPoint = urlGenerator("follow");
  const params = {
    followee_id
  };
  return http.post(endPoint, params);
}

export function unFollow(followee_id) {
  const endPoint = urlGenerator("unfollow");
  const params = {
    followee_id
  };
  return http.post(endPoint, params);
}

export function updateUserData(values) {
  return http.put(apiEndpoint, values);
}

export function uploadUserImage(values) {
  const endPoint = urlGenerator("upload/pic");
  return http.post(endPoint, values);
}
