import axios from "axios";
const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});
console.log(process.env.VUE_APP_REQUEST_URL);
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
const get = (url, params, config) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        config,
        params
      })
      .then(({ data }) => resolve(data))
      .catch(e => reject(e));
  });
};
const post = (url, params, config) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, config)
      .then(({ data }) => resolve(data))
      .catch(e => reject(e));
  });
};
const put = (url, params, config) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, params, config)
      .then(({ data }) => resolve(data))
      .catch(e => reject(e));
  });
};
const remove = (url, params, config) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, {
        config,
        params
      })
      .then(({ data }) => resolve(data))
      .catch(e => reject(e));
  });
};
export { get, post, put, remove };
