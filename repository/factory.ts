import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
  CreateAxiosDefaults,
} from "axios";
import { getCookie, setCookie } from "typescript-cookie";

type RequestConfig = Pick<AxiosRequestConfig, "headers" | "params">;

export class AxiosClient {
  $axios: AxiosInstance;
  constructor(axios: AxiosStatic, config: CreateAxiosDefaults = {}) {
    this.$axios = axios.create({
      ...config,
    });

    this.initAuthTokenInterceptor();
  }
  postFile<T>(url: string, payload: FormData, config?: RequestConfig) {
    return this.$axios.post<unknown, AxiosResponse<T>>(url, payload, config);
  }

  get<T>(url: string, config?: RequestConfig) {
    return this.$axios.get<T>(url, config);
  }

  post<T>(url: string, payload?: Object, config?: RequestConfig) {
    return this.$axios.post<unknown, AxiosResponse<T>>(url, payload, config);
  }

  put<T>(url: string, payload?: Object, config?: RequestConfig) {
    return this.$axios.put<unknown, AxiosResponse<T>>(url, payload, config);
  }

  patch<T>(url: string, payload?: Object, config?: RequestConfig) {
    return this.$axios.patch<unknown, AxiosResponse<T>>(url, payload, config);
  }

  delete<T>(url: string, config?: RequestConfig) {
    return this.$axios.delete<unknown, T>(url, config);
  }

  initAuthTokenInterceptor() {
    this.$axios.interceptors.request.use(
      async (config) => {
        const accessToken = getCookie("restaurant-pos-user") || "test";
        if (accessToken) {
          config.headers.Authorization = `Bearer ${
            JSON.parse(accessToken).token
          }`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }
}
