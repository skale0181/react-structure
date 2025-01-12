import axios from "axios";
import addDeleteGetLocalStorage from "./addDeleteGetLocalStorage";
import { STORAGE } from "./localVariables";
import { API_KEY, BASE_URL } from "../BaseUrl";
import { decodedToken } from "../utils/tokenDecode";
import { CONSTANTS } from "../utils/constants";
/**
 * @description This function is used to logout the user
 */
export const sessionLogout = async () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};
/**
 * @description This function is used to start the session time
 */
const startSessionTime = () => {
  let time = new Date().getTime().toString();
  addDeleteGetLocalStorage(STORAGE.SESSION_TIME, time, "add", "single");
};
/**
 * @description This function is used to get the third party request
 */
export const ThirdPartyRequest = async (
  url,
  method = "get",
  headers = {},
  data = {},
  options = {}
) => {
  startSessionTime();
  var config = {
    method: method,
    url: url,
    headers: headers,
    data: data,
    ...options,
  };
  if (url !== undefined) {
    return new Promise((resolve, reject) => {
      axios(config)
        .then((response) => {
          if (response?.data?.status === 401) {
            sessionLogout();
          }
          resolve(response.data);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            sessionLogout();
          }
          reject(err);
        });
    });
  }
};
/**
 * @description This function is used to refresh token
 */
export const TokenRefresh = async (url, headers) => {
  await axios
    .get(url, { headers })
    .then((res) => {
      if (res?.data?.status === "SUCCESS") {
        let accessToken = res?.data?.data?.token;
        addDeleteGetLocalStorage(
          STORAGE.USER_TOKEN,
          accessToken,
          "add",
          "single"
        );
      } else if (res?.status === "FAILURE") {
        console.error(res);
      }
    })
    .catch((err) => {
      console.error(err);
      localStorage.clear();
    });
};
/**
 * @description This function is used to call all api
 * global axios request for post get put and delete
 */
const globalRequest = (
  url,
  method = "get",
  data = {},
  options = {},
  token = true
) => {
  let headers = {
    "x-api-key": API_KEY,
  };
  const userToken = addDeleteGetLocalStorage(STORAGE.USER_TOKEN, {}, "get");
  if (token) {
    headers.authorization = "Bearer " + userToken;
  }
  //refresh token functionality
  let decoded = decodedToken(userToken);
  if (userToken && decoded) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert the current time to Unix timestamp in seconds
    const decodedExp = decoded?.exp;
    if (decodedExp > currentTimestamp) {
      const timeLeft = decodedExp - currentTimestamp;
      //refresh token before 3 minutes
      if (timeLeft < 18000) {
        // TokenRefresh(BASE_URL + ONBOARDING_APIS?.REFRESH_TOKEN, headers);
      }
    }
  }
  let sendData = {
    method: method,
    url: BASE_URL + url,
    headers: headers,
    ...options,
  };
  if (data) {
    sendData.data = data;
  }
  startSessionTime(); //start session time
  return new Promise((resolve, reject) => {
    axios(sendData)
      .then((response) => {
        const status = response?.status;
        if (status === 200 || status === 201) {
          resolve(response?.data);
        } else {
          resolve({ data: null, message: CONSTANTS?.errMsg });
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          sessionLogout();
        }
        reject(err);
      });
  });
};
export default globalRequest;
