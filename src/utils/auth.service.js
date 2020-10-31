import API from 'api';
import { toast } from 'react-toastify';

export const login = async (email, password, role) => {
  try {
    const { accessToken } = await API.post('/user/login', {
      email,
      password,
      role
    });
    window.localStorage.setItem('accessToken', accessToken);
    toast.success('Login Successful');
    return;
  } catch (error) {
    toast.error('Login Error');
    throw new Error(error.detail);
  }
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('role');
};

export const checkAccessToken = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.get('/user/info', {}, accessToken);
    return data;
  } catch (error) {
    logout();
    throw new Error(error.detail);
  }
};

export const createUser = async (email, password, role) => {
  try {
    const { accessToken } = await API.post('/user/create', {
      email,
      password,
      role
    });
    window.localStorage.setItem('accessToken', accessToken);
    return;
  } catch (error) {
    toast.error('Signup Error');
    throw new Error(error.detail);
  }
};
