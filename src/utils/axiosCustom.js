import axios from "axios";
import { store } from "../redux/store";
const instance = axios.create({
  baseURL: "http://localhost:5227/",
});

instance.interceptors.request.use(
  function (config) {
    console.log("check store", store.getState());
    // const access_token = store?.getState()?.user?.account?.access_token;
    // config.headers["Authorization"] = "Bearer " + access_token;

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
