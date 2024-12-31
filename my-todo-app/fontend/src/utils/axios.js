import { useUserStore } from "@/stores/user";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  withCredentials: true,
});

const axiosJWT = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosJWT.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const previousRequest = error.config;

    if (error.response && error.response.status === 403) {
      try {
        const response = await axiosInstance.post("/user/refreshtoken", {});
        const token = response.data.result;

        const userStore = useUserStore();
        userStore.setToken(token);
        previousRequest.headers.Authorization = `Bearer ${token}`;

        return axiosJWT.request(previousRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);

export default axiosJWT;
