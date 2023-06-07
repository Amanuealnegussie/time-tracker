import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getRequest(url) {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {}
}

export async function postRequest(url, data) {
  const id = toast.loading("Loading");
  try {
    const response = await api.post(url, data);
    toast.update(id, {
      render: "Success",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    return response.data;
  } catch (error) {
    console.log("error");
    console.log(error);
    console.log("error");
    toast.update(id, {
      render: error.response.data.message,
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  }
}

export async function putRequest(url, data) {
  const id = toast.loading("Loading");
  try {
    const response = await api.put(url, data);
    toast.update(id, {
      render: "Success",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    return response.data;
  } catch (error) {
    toast.update(id, {
      render: error.response.data.message,
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  }
}

export async function deleteRequest(url) {
  const id = toast.loading("Loading");
  try {
    const response = await api.delete(url);
    toast.update(id, {
      render: "Success",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    return response.data;
  } catch (error) {
    toast.update(id, {
      render: error.response.data.message,
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  }
}
