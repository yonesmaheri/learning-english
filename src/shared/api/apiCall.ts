import axios from "axios";
// import { toast } from "react-toastify";

export const apiCall = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// apiCall.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const status = error.response.status;
//       const message = error.response.data.detail || "Something went wrong";
//       if (status === 404) toast.error(message);
//       else if (status === 400) toast.error(message);
//       else if (status === 401) {
//         toast.error(message);
//       } else toast.error(`Error ${status}: ${message}`);
//     } else if (error.request) {
//       toast.error("No response from server, please try again.");
//     } else {
//       toast.error("Request error: " + error.message);
//     }

//     return Promise.reject(error);
//   },
// );
