/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "./stores/authStore";

const getAuthToken = (): string | null => {
  return useAuthStore.getState().user?.token || null;
};

export const authHttp = {
  get: async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
      ...config,
      headers,
    });
  },

  post: async (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, data, {
      ...config,
      headers,
    });
  },

  put: async (
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, data, {
      ...config,
      headers,
    });
  },

  delete: async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
      ...config,
      headers,
    });
  },
};
