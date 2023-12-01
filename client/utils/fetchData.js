import axios from "axios";
import Constants from "expo-constants";

const port = 5000;
const uri = Constants?.expoConfig?.hostUri
  ? Constants.expoConfig.hostUri.split(`:`).shift().concat(`:${port}`)
  : `localhost:${port}`;

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`http://${uri}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`http://${uri}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`http://${uri}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`http://${uri}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`http://${uri}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
