import axios from "axios";

export const apiCall = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// جلوگیری از چند بار refresh همزمان
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiCall.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiCall(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          "http://localhost:8000/api/token/refresh/",
          {},
          { withCredentials: true },
        );

        processQueue(null);
        return apiCall(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        console.log("Refresh token expired. Redirecting to login...");
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
