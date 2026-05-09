import axios from "axios";
// import { toast } from "sonner";

export const apiCall = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});