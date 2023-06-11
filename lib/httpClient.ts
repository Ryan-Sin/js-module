import axios, { AxiosRequestConfig } from "axios";

const axiosRequestConfig: AxiosRequestConfig = {
  method: "POST",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const request = (
  host: string,
  path: string,
  callOptions: AxiosRequestConfig,
  retries = 1,
  delay = 1000
): Promise<any> => {
  const options: AxiosRequestConfig = { ...axiosRequestConfig, ...callOptions };

  return new Promise((resolve, reject) => {
    function makeRequest(numberOfRequestAttempts: number) {
      axios(host + path, options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (numberOfRequestAttempts > retries) {
            setTimeout(() => makeRequest(numberOfRequestAttempts + 1), delay);
          } else {
            reject(error);
          }
        });
    }
    makeRequest(0);
  });
};
