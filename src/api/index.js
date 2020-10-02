import axios from 'axios';

const httpUrl =
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://careyourpets.herokuapp.com';
/** Commented below out because it causes Access control origin errors */
// axios.defaults.withCredentials = true;

const getRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(httpUrl + url, { params: data || {} })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const delRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(httpUrl + url, { data })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const putRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(httpUrl + url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const postRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(httpUrl + url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export default {
  get: getRequest,
  del: delRequest,
  put: putRequest,
  post: postRequest
};
