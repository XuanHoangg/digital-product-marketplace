import axios from "axios";
import { store } from "../redux/store";
const instance = axios.create({
  baseURL: "http://localhost:5227/",
});

instance.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const accessToken = state?.auth?.account?.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // if (error.response?.status === 401) {
    //   // Xử lý logout, hoặc redirect user về login
    //   // store.dispatch(logoutAction());
    //   window.location.href = "/login";
    // }
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
