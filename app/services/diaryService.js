import http from "./httpService";

const getDiarymyEndpoint = "/diary";
const myDiariesEndpoint = "/diaries";
const contributorDiaries = "/contributor/diaries";
const postToDiary = "/diary/upload/pic";

export function getDiary(diary_id) {
  const params = {
    diary_id
  };
  return http.get(getDiarymyEndpoint, { params });
}

export function getMyDiaries(user_id, limit, offset) {
  const params = {
    limit: limit,
    offset: offset,
    user_id
  };

  return http.get(myDiariesEndpoint, { params });
}

export function getContributorDiaries(user_id) {
  const params = {
    // limit: limit,
    // offset: offset,
    user_id
  };

  return http.get(contributorDiaries, { params });
}

export function uploadToDiary(diary_id, formData) {
  const params = {
    diary_id
  };

  return http.post(postToDiary, formData, { params });
}
