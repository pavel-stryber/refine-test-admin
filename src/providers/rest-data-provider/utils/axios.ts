import { HttpError } from "@refinedev/core";
import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authString = Cookies.get("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
