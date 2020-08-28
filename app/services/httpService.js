import axios from "axios";
import { SERVER_URL } from "../config/globals";

axios.defaults.baseURL = SERVER_URL;

function setJwt(jwt) {
  axios.defaults.headers.common["token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
