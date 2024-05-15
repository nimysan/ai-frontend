import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // 从 localStorage 获取认证令牌
  const authToken = localStorage.getItem("authToken");

  // 如果认证令牌存在,则将其添加到请求头中
  if (!config.headers) {
    config.headers = {};
  }
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response && error.response.status === 401) {
    // 如果响应状态码为 401 (未授权),则导航到登录页面
    // navigator?.push("/login");
    // 从 localStorage 中删除 authToken
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.replace("/authentication/sign-in");
    // debugger;
  } else {
    console.error(`[response error] [${JSON.stringify(error)}]`);
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest as any, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
