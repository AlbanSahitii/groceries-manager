import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3080/api",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log(originalRequest);

    if (
      originalRequest.url.includes("/user/login") ||
      originalRequest.url.includes("/user/register")
    ) {
      return Promise.reject(error);
    }

    if (!originalRequest._retry) {
      originalRequest._retry = false;
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      console.log(`Request is with status${error.response.status}`);
      try {
        const res = await api.post("/user/refresh_token");
        localStorage.setItem("jwt", res.data);

        api.defaults.headers.common["authorization"] = `Bearer ${res.data}`;
        originalRequest.headers["authorization"] = `Bearer ${res.data}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
