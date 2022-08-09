import axios from "axios";

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const request = ({ ...options }) => {
  const token = localStorage.getItem("blognado-access-token");
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (resp: any) => resp;
  const onError = (err: any) => {};
  return client(options).then(onSuccess);
};
